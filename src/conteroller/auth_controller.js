import User from "../models/auth.js";
import jwt from "jsonwebtoken";
import { generateOTP } from "../utils/otp.js";


// Register User & Send OTP
export const signup= async (req, res) => {
    const { phone } = req.body;

    if (!phone) return res.status(400).json({ error: "Phone number is required" });

    try {
        let user = await User.findOne({ phone });

        if (user) return res.status(400).json({ error: "Phone number already registered" });

        console.log("User not found, proceeding to create a new user...");

        const otp = generateOTP();
        user = new User({ phone, otp });
        const result = await user.save();
        res.json({ message: "OTP sent successfully" });
    } catch (err) {
        console.error("Error during signup:", err); 
        res.status(500).json({ error: "Server Error" });
    }
}

//  Verify OTP & Create  exportAccount
export const verifyOTP= async (req, res) => {
    const { phone, otp } = req.body;
    try {
        const user = await User.findOne({ phone });
        console.log("user:", user)
        if (!user) return res.status(400).json({ error: "User not found" });

        if (user.otp !== otp) return res.status(400).json({ error: "Invalid OTP" });

        user.isVerified = true;
        console.log(user)
        await user.save();
        const token = jwt.sign({ user_details: user }, process.env.JWT_SECRET, { expiresIn: "1d" });
        console.log("token:", token)
        res.json({ message: "OTP Verified, Registration Complete", token });
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
}

//  Login User
export const login= async (req, res) => {
    const { phone } = req.body;

    if (!phone) return res.status(400).json({ error: "Phone number is required" });

    try {
        const user = await User.findOne({ phone });
        if (!user) return res.status(400).json({ error: "User not found" })
        if (!user.isVerified) return res.status(400).json({ error: "User not verified" });
        const token = jwt.sign({ user_details: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.json({ message: "Login successful", token });
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
}

//  Logout User
export const logout= async (req, res) => {
    const { token } = req.body;

    if (!token) return res.status(400).json({ error: "Token is required" });

    try {
        res.json({ message: "Logout successful" });
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
}

//  Refresh Token
export const refreshToken= async (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: "Token is required" });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const newToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({ token: newToken });
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
}

//  Forgot Password
export const forgotPassword= async (req, res) => {
    const { phone } = req.body;

    if (!phone) return res.status(400).json({ error: "Phone number is required" });

    try {
        const user = await User.findOne({ phone });

        if (!user) return res.status(400).json({ error: "User not found" });

        const otp = generateOTP();
        user.otp = otp;
        await user.save();

        console.log(`OTP for password reset: ${otp}`);

        res.json({ message: "OTP sent for password reset" });
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
}

//  Reset Password
export const resetPassword= async (req, res) => {
    const { phone, otp, newPassword } = req.body;

    if (!phone || !otp || !newPassword) return res.status(400).json({ error: "All fields are required" });

    try {
        const user = await User.findOne({ phone });

        if (!user) return res.status(400).json({ error: "User not found" });

        if (user.otp !== otp) return res.status(400).json({ error: "Invalid OTP" });

        user.password = newPassword;
        user.otp = null;
        await user.save();

        res.json({ message: "Password reset successful" });
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
}




