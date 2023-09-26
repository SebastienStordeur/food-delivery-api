import { Request, Response } from "express";
import bcrypt from "bcrypt";

import Joi from "joi";
import { db } from "../../config/admin";
import admin from "firebase-admin";

export async function createUser(req: Request, res: Response) {
  try {
    const schemaValidation = Joi.object({
      email: Joi.string().email().required().max(200).min(6),
      password: Joi.string()
        .required()
        .min(10)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/),
    });

    const { email, password } = await schemaValidation.validateAsync(req.body);
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = {
      email,
      password: hashedPassword,
    };

    await admin.auth().createUser(newUser);
    const userRef = db.collection("users");
    const querySnapshot = await userRef.where("email", "==", email).get();

    if (!querySnapshot.empty) {
      return res.status(400).json({ ok: false, message: "This email is already used" });
    }

    await userRef.add(newUser);
    return res.status(201).json({ success: true, message: "User successfully created" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    console.log(email);

    const userRef = db.collection("users");
    const user = await admin
      .auth()
      .getUserByEmail(email)
      .then((res) => {
        console.log(res);
      });

    console.log(user, email);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
}
