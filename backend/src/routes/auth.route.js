import express from "express";
import { signup, login, logout, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router();

// Logout is exempt from Arcjet — it's just a cookie clear, no security risk
router.post("/logout", logout);

// Arcjet protection for all other routes
router.use(arcjetProtection);

router.post("/signup", signup);
router.post("/login", login);

router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, (req, res) => res.status(200).json(req.user));

export default router;

