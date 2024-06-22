import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import tokenGen from "../utils/tokenGen.js";

export const signup = async (req, res) => {
    try {
        //get data from req body and validate
        const { fullname, email, password, confirm } = req.body;
        if (password !== confirm) return res.status(400).json({ message: "Password not matched" });

        //check if user already exists
        const user = await User.findOne({ where: { email } });
        if (user) return res.status(400).json({ message: "User already exists" });

        //set profile pic and role
        const profilePic = "https://avatar.iran.liara.run/public/boy?username=" + email;
        const role = "admin";

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        //create new user
        const newUser = new User({
            fullname,
            email,
            password: hash,
            role,
            profilePic
        });

        //check if new user created
        if (!newUser) return res.status(400).json({ message: "Failed to create user" });

        //store in database
        await newUser.save();

        //set response cookie and status
        tokenGen(newUser.id, res);
        res.status(201).json({
            message: "User created successfully",
            data: newUser
        });

    } catch (error) {
        console.error("error in signup controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        //get data from req body
        const { email, password } = req.body;

        //check if user exists
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        //compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        //set response cookie and status
        tokenGen(user.id, res);
        res.status(200).json({
            message: "User logged in successfully",
            data: user
        });

    } catch (error) {
        console.error("error in login controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
        console.error("error in logout controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
};