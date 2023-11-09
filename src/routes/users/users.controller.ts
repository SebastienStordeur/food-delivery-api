import { Request, Response } from "express";
import argon2 from "argon2";

import Joi from "joi";
import { Session } from "express-session";
import { User } from "../../models/user/user.mongo";

interface CustomSession extends Session {
  userId: number;
}

export async function createUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const hashedPassword = await argon2.hash(password);

    const user = new User({
      email,
      password: hashedPassword,
    });

    await user.save();
    return res.status(201).json({ success: true, message: "User successfully created" });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

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
    return res.status(500).json({ success: false, error });
  }
}
