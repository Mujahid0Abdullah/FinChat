import Express from "express";
import { db } from "../connect.js"
//kriptografik kütüphane
import bcrypt from "bcryptjs";
// kullanıcı kimlik doğrulama
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in")
    jwt.verify(token, "SecretKey", (err, userInfo) => {
        console.log(userInfo)
        if (err) return res.status(403).json("Token is not valid");
        const q = "SELECT * FROM users WHERE id=?";
        const userId = userInfo.id;
        db.query(q, [userId], (err, data) => {
            if (err) return res.status(500).json(err);
            const { password, ...info } = data[0];
            return res.json(info);
        });
    })
};