import { validate } from "class-validator";

export async function validateEntity<T extends object>(
    entity: T,
): Promise<{ success: true } | { success: false; errors: string[] }> {
    const errors = await validate(entity as object, {
        whitelist: false,
        forbidNonWhitelisted: false,
    });

    if (errors.length === 0) return { success: true };

    const flattened = errors.flatMap((e) => {
        const constraints = e.constraints ? Object.values(e.constraints) : [];
        return constraints.length ? constraints : [`${e.property} is invalid`];
    });

    return { success: false, errors: flattened };
}

