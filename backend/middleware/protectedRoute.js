import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';
import cookieParser from 'cookie-parser';

export const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        if (!verified) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await User.findByPk(verified.id);
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectedRoute middleware: ", error.message);

        res.status(401).json({ message: "Unauthorized" });
    }
};