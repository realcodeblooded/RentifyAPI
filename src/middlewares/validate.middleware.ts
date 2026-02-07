import { Request, Response, NextFunction } from "express";
import yup from "yup"

export const validate = (schema: yup.Schema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validate(req.body, { abortEarly: false }); // Validate the request body
    next(); // Proceed to the next middleware or route
  } catch (error: any) {
    res.status(400).json({ errors: error.errors });
  }
};