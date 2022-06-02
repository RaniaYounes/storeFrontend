import { Request, Response,NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authToken = async (req: Request,res: Response,next:NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).send('Token not provided');
      return;
  }
  // verify token

     const payload= jwt.verify(token, process.env.TOKEN_SECRET as string);
    
     next()
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
};
