


import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
    try{
        const token= req.headers["authorization"].split(" ")[1];
        console.log("token", token)
        if (!token) {
            return res.status(401).json({ error: "No token provided" });
        }
        console.log(process.env.JWT_SECRET, "kkk")
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.user = decoded;
        next();
    }catch(err){
        console.error("Authentication error:", err.message);
        return res.status(403).json({ error: "Invalid token" });
    }
}

