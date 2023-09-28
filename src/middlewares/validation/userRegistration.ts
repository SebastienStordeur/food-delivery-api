import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const validateUserRegistration = async (req: Request, res: Response, next: NextFunction) => {
  const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
  const schemaValidation = Joi.object({
    email: Joi.string().email().required().max(200).min(6),
    password: Joi.string().required().min(10).regex(passwordRegex),
  });

  const { error } = await schemaValidation.validateAsync(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({ success: false, message: "Invalid request data", error });
  }

  return next();
};
