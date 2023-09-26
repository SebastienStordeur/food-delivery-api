import { rateLimit } from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 60 * 1000, //minute
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: "Too many requests",
});
