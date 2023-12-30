import Express from "express";
import bodyParser from "body-parser";
import multer from "multer"
import path from "path";
import { getPosts, addPost } from "../controllers/post.js"; //.js
import jwt from "jsonwebtoken";
import moment from "moment/moment.js";
import { db } from "../connect.js";
import { authorize } from '../proxy.js';

const router = Express.Router()
router.use(Express.json()); // JSON verilerini işlemek için
router.use(Express.urlencoded({ extended: true })); // URL-encoded verilerini işlemek için

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'C:/Users/Acer/Documents/GitHub/proje/public/uploads'); // Dosyanın kaydedileceği yol

    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Dosya adı ve uzantısı
        console.log(Date.now() + path.extname(file.originalname))

    }
});

const upload = multer({ storage: storage });

//authorize,
router.get("/", getPosts)
router.post("/", authorize, upload.single('img'), (req, res) => {

    console.log(req.body);
    const file = req.file;
    const imagePath = `C:/Users/Acer/Documents/GitHub/proje/public/uploads/${file.filename}`;
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
    });/*
    const token = req.cookies.accessToken;
    const file = req.file;
    console.log(file)
    const imagePath = `C:/Users/Acer/Documents/GitHub/proje/public/uploads/${file.filename}`;
    if (!token) return res.status(401).json("Not logged in")

    jwt.verify(token, "SecretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");


        const q = "INSERT INTO posts (`desc`, `img`, `userId`, `createdAt`) VALUES (?)";

        const descValue = req.body.desc;
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
    })*/
})

export const handlePostRequest = (req, res) => {
    // Gelen istekten gerekli bilgileri al
    const file = req.file;
    const imagePath = `C:/Users/Acer/Documents/GitHub/proje/public/uploads/${file.filename}`;
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
};

export default router