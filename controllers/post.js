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





export const addPost = (req, res) => {

    console.log(req.body);
    //const file = req.file;
    //const imagePath = `./public/uploads/${file.filename}`;
    const imagePath = "no image";
    const descValue = req.body.desc;
    const userInfo = req.userInfo; // Yetkilendirme adımında doğrulanan kullanıcı bilgileri

    const q = "INSERT INTO posts (`desc`, `img`, `userId`, `createdAt`) VALUES (?)";
    const values = [
        descValue,
        imagePath,
        userInfo.id,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
    ];

    // Veritabanına eklemek için isteği işle
    db.query(q, [values], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json("post eklendi");
    });
}


export const deletePost = (req, res) => {


    const q =
        "DELETE FROM posts WHERE `id`=? AND `userId` = ?";

    db.query(q, [req.body.postId, req.userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows > 0) return res.status(200).json("Post has been deleted.");
        return res.status(403).json("You can delete only your post")

    });
};




export const getmyPosts = (req, res) => {
    const q = "SELECT p.*, u.id AS userId, name, profilePic FROM posts p JOIN users u ON (u.id = p.userId) WHERE u.id=? ORDER BY p.createdAt DESC";
    db.query(q, [req.userInfo.id], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(data);
    });
};

export const getpost = (req, res) => {
    // Burada post ID'sini almak istediğiniz postun detaylarını alın
    // postDetails değişkeni örnek olarak bir postun detaylarını içeriyor olsun

    const q = "SELECT p.*, u.id AS userId, name, profilePic FROM posts p JOIN users u ON (u.id = p.userId) WHERE p.id=? ORDER BY p.createdAt DESC";
    console.log("q" + req.query);
    // console.log("p" + req.param);

    const id = req.query.postId;

    db.query(q, [id], (err, data) => {
        if (err) { return res.status(500).json(err); }

        return res.status(200).json(data);
    });
};



