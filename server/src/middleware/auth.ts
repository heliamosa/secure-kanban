import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const SECRET_KEY = process.env.JWT_SECRET;

if (!SECRET_KEY) {
    throw new Error("Missing JWT_SECRET in environment variables");
}

// Define the structure of the decoded token
interface DecodedToken extends JwtPayload {
    userId: string; // Modify based on your actual token payload
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access Denied: No Token Provided" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or Expired Token" });
        }

        // Type assertion to match our expected token structure
        (req as any).user = decoded as DecodedToken;
        next();
    });
};
