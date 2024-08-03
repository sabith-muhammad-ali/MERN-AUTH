import express from "express";
const router = express.Router();
import { authAdmin } from "../controllers/adminContoller.js";
import upload from "../middleware/upload.js";

router.post('/admin', authAdmin)

export default router;
