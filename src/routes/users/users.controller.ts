import { Request, Response } from "express";
import bcrypt from "bcrypt";

import Joi from "joi";
import { db } from "../../config/admin";

export async function createUser(req: Request, res: Response) {
  try {
    const schemaValidation = Joi.object({
      email: Joi.string().email().required().max(200).min(6),
      password: Joi.string().required().min(10),
    });
    const { email, password } = await schemaValidation.validateAsync(req.body);
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = {
      email,
      password: hashedPassword,
    };

    const userRef = db.collection("users");
    await userRef.add(newUser);
    return res.status(201).json({ success: true, message: "User successfully created" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false });
  }
}
