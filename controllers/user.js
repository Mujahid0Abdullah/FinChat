import Express from "express";
import { db } from "../connect.js"
//kriptografik kütüphane
import bcrypt from "bcryptjs";
// kullanıcı kimlik doğrulama
import jwt from "jsonwebtoken";
import { uploadFile } from "../googleimage.js"; //.js

export const getUser = (req, res) => {

    const q = "SELECT name, username,profilePic,id,email FROM users WHERE id=?";
    let id = req.query.userid;
    console.log(id)
    if (id == 0) { id = req.userInfo.id }
   
    db.query(q, [id], (err, data) => {
        if (err) return res.status(500).json(err);
       console.log(data);
        const useri= data[0]
        return res.json(useri);
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