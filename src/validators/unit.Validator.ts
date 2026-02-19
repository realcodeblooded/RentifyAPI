import { UnitType } from '../types/building.Types';
import * as yup from 'yup';

export const unitSchema = yup.object({
    unitKey: yup
        .string()
        .required('Unit key is required!'),
    floor: yup
        .number()
        .required('Unit floor number is required!'),
    buildingId: yup
        .string()
        .required('Building ID is required!'),
    type: yup
        .string()
        .required()
        .oneOf(Object.values(UnitType) as UnitType[]),
    description: yup
        .string()
        .optional(),
    rent: yup
        .string()
        .required()
});