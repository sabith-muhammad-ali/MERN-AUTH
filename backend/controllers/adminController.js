import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Log the incoming request
  console.log("Admin login attempt with email:", email);

  // Find the user by email
  const admin = await User.findOne({ email });

  // Log user data
  console.log("Admin found:", admin);

  if (admin) {
    // Check if user is admin
    console.log("Admin isAdmin:", admin.isAdmin);

    if (admin.isAdmin) {
      // Check password
      if (await admin.matchPassword(password)) {
        generateToken(res, admin._id);
        res.status(200).json({
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          isAdmin: admin.isAdmin,
        });
      } else {
        res.status(401);
        throw new Error("Invalid email or password");
      }
    } else {
      res.status(403);
      throw new Error("Access denied: Not an admin");
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { authAdmin };
