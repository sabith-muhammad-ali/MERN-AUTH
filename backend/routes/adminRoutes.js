import express from "express";
const router = express.Router();
import {
  authAdmin,
  logoutAdmin,
  getUser,
  deleteUser,
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/login", authAdmin);
router.post("/logout", logoutAdmin);
router.route("/dashboard").get(protect, getUser);
router.route("/dashboard/:id").delete(protect, deleteUser);

export default router;
