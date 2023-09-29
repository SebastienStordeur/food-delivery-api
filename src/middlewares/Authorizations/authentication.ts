import { NextFunction, Request, Response } from "express";

function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.session.user) {
    return next();
  }
  return res.status(401).send("Unauthorized");
}

export default isAuthenticated;
