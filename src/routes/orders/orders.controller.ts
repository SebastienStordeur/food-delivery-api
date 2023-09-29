import { Request, Response } from "express";
import stripe from "stripe";

import { Order } from "../../models/orders/order.mongo";

export async function orderMeal(req: Request, res: Response) {
  try {
    /*     const session = await stripe.checkout.sessions.create({
      success_url: "to define",
      line_items: [{ price: "", quantity: 2 }],
    }); */

    return res.status(201).json({ success: true });
  } catch (error) {}
}
