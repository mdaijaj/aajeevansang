import express from "express";

import { signup, login, logout, refreshToken, verifyOTP, forgotPassword, resetPassword} from "../conteroller/auth_controller.js";
import { profileUpdate, deleteAccount, usersList, profileDetails, userDetails , userSearch } from "../conteroller/user.js"; 
import { authenticate } from "../middleware/auth.js";
import {uploadProfile} from "../utils/fileupload.js";
import { upload } from "../middleware/upload.js"; 

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

//homepage
app.get("/profileDetails", authenticate,  profileDetails, middeearex); 
app.get("/usersList", authenticate, usersList); 
app.get("/userDetails/:id", authenticate, userDetails);
app.get("/search", authenticate, userSearch);


//upload profile pic
app.post('/api/upload', upload.array('documents', 10), authenticate, uploadProfile)


export default app;




