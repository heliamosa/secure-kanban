import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { pool } from "../db";

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "default_secret";

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const userResult = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

        if (userResult.rows.length === 0) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const user = userResult.rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

export default router;
