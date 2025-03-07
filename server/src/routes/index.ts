import express from "express";
import { authenticateToken } from "../middleware/auth";
import authRoutes from "./auth-routes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/tasks", authenticateToken, (req, res) => {
    res.json({ message: "Protected tasks route" });
});

export default router;
