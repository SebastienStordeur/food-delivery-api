import { NextFunction, Request, Response } from "express";

function hasPermission(role: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.session.user;
    if (user && user.permissions && user.permissions.includes(role)) {
      return next();
    }
    return res.status(403).json({ success: false, message: "Forbidden access" });
  };
}

export default hasPermission;
