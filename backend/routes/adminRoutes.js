// adminRoutes.js
import express from "express";
const router = express.Router();
import { authAdmin } from "../controllers/adminController.js";

router.post("/login", authAdmin);

export default router;
