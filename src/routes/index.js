import express from "express";
import { signup, login, logout, refreshToken, verifyOTP, forgotPassword, resetPassword} from "../conteroller/auth_controller.js";
import { profileUpdate, deleteAccount, getUser } from "../conteroller/user.js"; 
import { authenticate } from "../middleware/auth.js";

const app = express.Router();


//auth routes
app.post("/signup", signup);
app.post("/verifyOtp", verifyOTP);
app.post("/login", login);
app.post("/logout", logout);
app.post("/refreshToken", refreshToken);
app.post("/forgotPassword", forgotPassword);
app.post("/resetPassword", resetPassword);
app.post("/updateProfile", authenticate, profileUpdate);
app.delete("/deleteAccount", authenticate, deleteAccount); 
app.get("/getUser", authenticate, getUser); 




export default app;




