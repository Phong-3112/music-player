import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user";

interface AuthRequest extends Request {
  user?: IUser;
}

export const auth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      _id: string;
    };
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(404).send("User not found.");
    }

    req.user = user;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
