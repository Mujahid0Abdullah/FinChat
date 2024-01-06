import Express from "express";
import { db } from "../connect.js"
//kriptografik kütüphane
import bcrypt from "bcryptjs";
// kullanıcı kimlik doğrulama
import jwt from "jsonwebtoken";
import { uploadFile } from "../googleimage.js"; //.js

export const getUser = (req, res) => {

    const q = "SELECT * FROM users WHERE id=?";
    const userId = req.userInfo.id;
    db.query(q, [userId], (err, data) => {
        if (err) return res.status(500).json(err);
        const { password, ...info } = data[0];

        return res.json(info);
    });

};



export const finduser = (req, res) => {

    const q = "SELECT * FROM users WHERE name LIKE ?";
    const name = '%' + req.body.name + '%';
    db.query(q, [name], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });

}


export const updateUser = (req, res) => {

    console.log("Password:", req.body.password);
    /*
    const files = req.files;

    // Resim dosyasını bul
    console.log(req.file)
    console.log(req.files)
    const formData = req.body

    uploadFile(req.files.file);
*/
    //hash password
    const Salt = bcrypt.genSaltSync(10); // şifreleme metodu
    const hashedPassword = bcrypt.hashSync(req.body.password, Salt)
    console.log("Salt:", Salt);

    const q =
        "UPDATE users SET `name`=?,`password`=? ,`profilePic`=? WHERE id=? ";

    db.query(
        q,
        [
            req.body.name,
            hashedPassword,
            req.body.imgId,
            req.userInfo.id,
        ],
        (err, data) => {
            if (err) {
                return res.status(500).json(err);
            } else {
                if (data && data.affectedRows > 0) {
                    return res.json("Updated!");
                } else {
                    return res.status(403).json("You can update only your post!");
                }
            }

        }
    );

};