import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { uploadToCloudinary } from "../config/cloudinary.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register User
export const registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  const imageFile = req.file;
  // console.log(imageFile)
  // console.log(fullName, email, password)

  // Validation: Check for missing fields
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  //  console.log("console 2")

  //  console.log("console 3")

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    let profileImageUrl;
    if (imageFile) {
      if (!imageFile.mimetype.startsWith("image/")) {
        return res
          .status(400)
          .json({ message: "Only image files are allowed" });
      }
      //   console.log("console 4")
      // console.log(imageFile.buffer)
      profileImageUrl = await uploadToCloudinary(imageFile.buffer, "users");
    }

    // Create the user
    console.log("Console Before")
    console.log(profileImageUrl)
    console.log("Console After")
    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl: profileImageUrl.secure_url ? profileImageUrl.secure_url : "",
    });

    //   console.log("console 5")
    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body || {};
  if ((!email, !password)) {
    return res.status(400).json("All fields are required");
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error logging user", error: error.message });
  }
};

// Get User Info
export const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
