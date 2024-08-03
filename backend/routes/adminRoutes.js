import express from "express";
const router = express.Router();
import {
  authAdmin,
  logoutAdmin,
  getUser,
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js"; 
import upload from "../middleware/upload.js";


router.post("/login", authAdmin);
router.post("/logout", logoutAdmin);
router
  .route("/dashboard")
  .get(protect, getUser)
  .put(protect, upload.single("image"), getUser);

export default router;
