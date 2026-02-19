import { ALLOWED_FILE_SIZE, ALLOWED_MIME_TYPES } from '@/services/images.Services';
import { BuildingType } from '../types/building.Types';
import * as yup from 'yup';

const photoSchema = yup
    .object({})
    .required()
    .test(
        'fileSize',
        'File size too large (max 3MB)',
        (value: any) => {
            // If the field is optional, return true if no file is present
            if (!value) return true;
            // Check if the file size is within the limit
            return value.size <= ALLOWED_FILE_SIZE;
        }
    )
    .test(
        'fileFormat',
        'Unsupported file format',
        (value: any) => {
            if (!value) return true;
            // Check if the file type is in the supported formats array
            return ALLOWED_MIME_TYPES.includes(value.type);
        }
    )

export const buildingSchema = yup.object({
    buildingName: yup
        .string()
        .required('Building name is required!'),
    locationName: yup
        .string()
        .required('Location name is required!'),
    x: yup
        .string()
        .required('X coordinate is required!'),
    y: yup
        .string()
        .required('Y coordinate is required!'),
    photos: yup
        .array()
        .of(photoSchema)
    /**
     * Uncomment to make it required
     */
    // .required('At least one building photo is required')
    ,
    type: yup
        .string()
        .required('Building type is required!')
        .oneOf(Object.values(BuildingType) as BuildingType[]),
    amenities: yup
        .string()
        .optional()
});