import Express from "express";
import { db } from "../connect.js"
//kriptografik kütüphane
import bcrypt from "bcryptjs";
// kullanıcı kimlik doğrulama
import jwt from "jsonwebtoken";
import { uploadFile } from "../googleimage.js"; //.js

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
            console.log(data[0].profilePic)
            return res.json(info);
        });
    })
};


export const updateUser = (req, res) => {

    console.log("Password:", req.body.password);
    //yeni kullanıcı oluşturma
    const files = req.files;

    // Resim dosyasını bul
    console.log(req.file)
    console.log(req.files)
    const formData = req.body;
    const imgFile = formData.get('file');

    uploadFile(imgFile);

    //hash password
    const Salt = bcrypt.genSaltSync(10); // şifreleme metodu
    const hashedPassword = bcrypt.hashSync(req.body.password, Salt)
    console.log("Salt:", Salt);

    const q =
        "UPDATE users SET `name`=?,`password`=? WHERE id=? ";

    db.query(
        q,
        [
            req.body.name,
            hashedPassword,
            req.userInfo.id,
        ],
        (err, data) => {
            if (err) res.status(500).json(err);
            if (data.affectedRows > 0) return res.json("Updated!");
            return res.status(403).json("You can update only your post!");
        }
    );

};