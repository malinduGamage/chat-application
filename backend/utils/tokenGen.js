import jwt from 'jsonwebtoken';

const tokenGen = (id, res) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '14d',
    });
    res.cookie('token', token, {
        httpOnly: true, // cookie cannot be accessed by client side js
        maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
        sameSite: 'strict', // cookie cannot be sent with cross-origin requests
        secure: process.env.NODE_ENV != "development", // cookie can only be sent over https
    });
}

export default tokenGen;