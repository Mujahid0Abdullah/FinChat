import Express from "express";
import jwt from "jsonwebtoken";
import moment from "moment/moment.js";
import { db } from "../connect.js";
import multer from "multer";
import { authorize } from '../proxy.js';

export const getPosts = (req, res) => {
    const q = "SELECT p.*, u.id AS userId, name, profilePic FROM posts p JOIN users u ON (u.id = p.userId) ORDER BY p.createdAt DESC";
    db.query(q, (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(data);
    });
};

/*
export const getPosts = (req, res) => {
    const token = req.cookies.accessToken;
    //const token = req.headers.authorization; // Authorization header'ından token'i alın

    console.log(token);
    if (!token) return res.status(401).json("Not logged in")

    jwt.verify(token, "SecretKey", (err, userInfo) => {
        console.log(userInfo)
        if (err) return res.status(403).json("Token is not valid");
        console.log("getposts");
        const q = "SELECT p.* ,u.id AS userId , name , profilePic FROM posts p JOIN users u ON (u.id= p.userId) ORDER BY p.createdAt DESC "
        db.query(q, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    })
}

*/
export const addPost = (req, res) => {
    console.log(req.body);
    const token = req.cookies.accessToken;
    const file = req.file;
    const imagePath = `/uploads/${file.filename}`;
    if (!token) return res.status(401).json("Not logged in")

    jwt.verify(token, "SecretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");


        const q = "INSERT INTO posts (`desc`, `img`, `userId`, `createdAt`) VALUES (?)";

        const descValue = req.body.des;
        console.log(descValue);
        const values = [
            descValue,
            imagePath,
            userInfo.id,

            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("post eklendi");//builder pattern
        });
    })
}
/*
export const addPost = (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in")

    jwt.verify(token, "SecretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");


        const q = "INSERT INTO posts (`desc`, `img`, `userId`, `createdAt`) VALUES (?)";

        const descValue = req.body.des;
        console.log(descValue);
        const values = [
            descValue,
            req.body.img,
            userInfo.id,

            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("post eklendi");//builder pattern
        });
    })
}
    */
