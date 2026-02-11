import multer from "multer";

/**
 * @constant ALLOWED_MIME_TYPES
 * * Array of allowed file types
 * 
 * @constant ALLOWED_FILE_SIZE
 * Allowed file size
 */
export const ALLOWED_MIME_TYPES: string[] = ["image/png", "image/jpeg", "image/jpg"];
export const ALLOWED_FILE_SIZE: number = 1 * 1024 * 1024; // 1MB

export const IMAGES_TO_BASE64 = (IMAGES: Express.Multer.File[], FILE_NUMBER_LIMIT: number): { Error?: string | null, Images: string[] } => {

    // Ensure at least one image is given
    if (IMAGES.length < 1) {
        return {
            Error: "At least one image is required",
            Images: []
        }
    }

    // Ensure only the limited number of files is allowed
    if (IMAGES.length > FILE_NUMBER_LIMIT) {
        return {
            Error: `Maximum number of ${FILE_NUMBER_LIMIT} files is allowed`,
            Images: []
        }
    }

    for (const image of IMAGES) {
        // Validate image mime types
        if (!ALLOWED_MIME_TYPES.includes(image.mimetype)) {
            return {
                Error: `${image.mimetype} is not allowed`,
                Images: []
            }
        }

        // Validate image size
        const IMAGE_SIZE_LIMIT = image.size / ALLOWED_FILE_SIZE;
        if (IMAGE_SIZE_LIMIT > 1) {
            return {
                Error: `${image.originalname} file size exceeds 1 MB limit`,
                Images: []
            }
        }
    }
    const PROCESSED_IMAGES = IMAGES.map(image => {
        const IMAGE_BUFFER_BASE64 = image.buffer.toString('base64');
        return `data:${image.mimetype};Base64,${IMAGE_BUFFER_BASE64}`
    })

    return {
        Images: PROCESSED_IMAGES
    }
}

export const selfUpload = multer({
    storage: multer.memoryStorage()
})