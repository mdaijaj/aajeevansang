import express from "express";
import connectDB from "../config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/index.js"; 

dotenv.config();
connectDB();

const app = express();
app.use(express.json());


app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use("/api", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


