import * as yup from "yup";

export const maintenanceSchema = yup.object({
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters long"),

  requestedById: yup.string().required(),
});

export const maintenanceResolveSchema = yup.object({
  resolutionNotes: yup.string().optional().nullable(),
});
