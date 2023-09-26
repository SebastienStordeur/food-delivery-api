import { Request, Response } from "express";
import argon2 from "argon2";

import Joi from "joi";
import { PrismaClient } from "@prisma/client";
import { Session } from "express-session";

interface CustomSession extends Session {
  userId: number;
}

const prisma = new PrismaClient();

export async function createUser(req: Request, res: Response) {
  try {
    const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    const schemaValidation = Joi.object({
      email: Joi.string().email().required().max(200).min(6),
      password: Joi.string().required().min(10).regex(passwordRegex),
    });

    const { email, password } = await schemaValidation.validateAsync(req.body, { abortEarly: false });
    const hashedPassword = await argon2.hash(password);

    const existingUser = await prisma.user.findFirst({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ success: false, message: "This email is already used" });
    }

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullname: "test",
      },
    });

    return res.status(201).json({ success: true, message: "User successfully created" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const existingUser = await prisma.user.findFirst({ where: { email } });
    if (!existingUser) {
      return res.status(400).json({ success: false, message: "This user does not exist" });
    }

    const matchedPassword = await argon2.verify(existingUser.password, password);
    if (!matchedPassword) {
      return res.status(400).json({ success: false, message: "Wrong email/password combination" });
    }

    (req.session as CustomSession).userId = existingUser.id;

    return res.status(200).json({ success: true, existingUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
}
