import UserModel from "../models/user.js";

import jwt from "jsonwebtoken";


export const profileUpdate = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ error: "Unauthorized: No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded", decoded); 
        const userId = decoded.user_details;

        if (!userId) {
            return res.status(400).json({ error: "Invalid token: Phone number or userId missing" });
        }

        const updateFields = req.body; 

        let user = await UserModel.findOne({ userId: userId });
        if (user) {
            Object.assign(user, updateFields);
            user.userId = userId;
            await user.save();
            return res.json({ message: "User updated successfully", user });
        } else {
            user = new UserModel({ userId, ...updateFields });
            await user.save();
            return res.json({ message: "User created successfully", user });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server Error" });
    }
};



//  Delete Account
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

//  Get User
export const usersList = async (req, res) => {
    try {
        const { userStatus } = req.query;
        const filter = {};
        if (userStatus) {
            filter.userStatus = userStatus; 
        }

        const users = await UserModel.find(filter);
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        return res.status(200).json({
            message: "Users fetched successfully",
            data: users
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};



export const userDetails = async (req, res) => {
    try {
        const userId = req.params.id;
        const getData = await UserModel.findOne({ _id: userId });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch data by ID Successfully", data: getData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
}

export const profileDetails = async (req, res) => {
    try {
        console.log("req.user", req.user);
        const userId = req.user?.user_details?._id;
        if (!userId) {
            return res.status(400).json({ code: 400, message: "Invalid user ID in token" });
        }
        const getData = await UserModel.findOne({userId: userId});
        if (getData) {
            return res.status(200).json({ code: 200, message: "Fetched user data successfully", data: getData });
        } else {
            return res.status(404).json({ code: 404, message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ code: 500, message: "Server Error" });
    }
};


export const userSearch = async (req, res) => {
    try {
        const {
            id,
            min,
            max,
            min_height,
            max_height,
            marital,
            cast,
            mother_tongue,
            min_income,
            max_income,
            country,
            state,
            occupation,
        } = req.query;

        let query = {};

        if (id) {
            query.$or = [
                { userId: { $regex: id, $options: "i" } },
                { userName: { $regex: id, $options: "i" } },
                { email: { $regex: id, $options: "i" } },
                { phone: { $regex: id, $options: "i" } }
            ];
        }

        if (min || max) {
            query.age = {};
            if (min) query.age.$gte = parseInt(min);
            if (max) query.age.$lte = parseInt(max);
        }

        if (min_height || max_height) {
            query.height = {};
            if (min_height) query.height.$gte = parseFloat(min_height);
            if (max_height) query.height.$lte = parseFloat(max_height);
        }

        if (min_income || max_income) {
            query.income = {};
            if (min_income) query.income.$gte = parseInt(min_income);
            if (max_income) query.income.$lte = parseInt(max_income);
        }

        // Other filters (exact match)
        if (marital) query.maritalStatus = marital;
        if (cast) query.cast = cast;
        if (mother_tongue) query.motherTongue = mother_tongue;
        if (country) query.country = country;
        if (state) query.state = state;
        if (occupation) query.occupation = occupation;

        const searchData = await UserModel.find(query);

        if (searchData.length === 0) {
            return res.status(404).json({ message: "No data found" });
        }

        return res.status(200).json({ message: "Search results", data: searchData });
    } catch (error) {
        console.error("Search API error:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};


export default { profileUpdate, deleteAccount, usersList, profileDetails, userDetails, userSearch };
