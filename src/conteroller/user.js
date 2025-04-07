import UserModel from "../models/user.js"; // Ensure correct import

import jwt from "jsonwebtoken";


export const profileUpdate = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ error: "Unauthorized: No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded", decoded); 
        const userId = decoded.user_details._id;

        if (!userId) {
            return res.status(400).json({ error: "Invalid token: Phone number or userId missing" });
        }

        const updateFields = req.body; 

        let user = await UserModel.findOne({ userId: userId });
        if (user) {
            // Update existing user with all fields from req.body
            Object.assign(user, updateFields);
            user.userId = userId; // Ensure userId is updated
            await user.save();
            return res.json({ message: "User updated successfully", user });
        } else {
            // Create a new user with phone, userId from token, and req.body fields
            user = new UserModel({ userId, ...updateFields });
            await user.save();
            return res.json({ message: "User created successfully", user });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server Error" });
    }
};



// 📌 Delete Account
export const deleteAccount= async (req, res) => {
    const { phone } = req.body;

    if (!phone) return res.status(400).json({ error: "Phone number is required" });

    try {
        const user = await User.findOneAndDelete({ phone });

        if (!user) return res.status(400).json({ error: "User not found" });

        res.json({ message: "Account deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
}

// 📌 Get User
export const getUser= async (req, res) => {
    const { phone } = req.body;

    if (!phone) return res.status(400).json({ error: "Phone number is required" });

    try {
        const user = await UserModel.findOne({ phone });

        if (!user) return res.status(400).json({ error: "User not found" });

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
}
