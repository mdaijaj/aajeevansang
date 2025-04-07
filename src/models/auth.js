import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    phone: { type: String, required: true, unique: true },
    otp: { type: Number, required: true },
    isVerified: { type: Boolean, default: false },
});

export default mongoose.model("auth", userSchema);
