import Express from "express";
import bodyParser from "body-parser";
import multer from "multer"
import path from "path";
import { getPosts, addPost, getpost, getmyPosts, deletePost } from "../controllers/post.js"; //.js
import jwt from "jsonwebtoken";
import moment from "moment/moment.js";
import { db } from "../connect.js";
import { authorize } from '../proxy.js';

const router = Express.Router()
router.use(Express.json()); // JSON verilerini işlemek için
router.use(Express.urlencoded({ extended: true })); // URL-encoded verilerini işlemek için





const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads'); // Dosyanın kaydedileceği yol

    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Dosya adı ve uzantısı
        console.log(Date.now() + path.extname(file.originalname))

    }
});




const upload = multer({ storage: storage });



//authorize,
router.get("/", authorize, getPosts)
router.get("/myposts", authorize, getmyPosts)


//router.post("/", authorize, upload.single('img'), (req, res) => {

router.post("/", authorize, addPost)

router.delete("/", authorize, deletePost)

router.get("/post", authorize, getpost)






export default router