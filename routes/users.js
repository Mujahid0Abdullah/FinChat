import Express from "express";
import { authorize } from '../proxy.js';
import path from "path";
import multer from "multer";



import { getUser, updateUser } from "../controllers/user.js"; //.js

const router = Express.Router()



router.get("/", getUser)

router.put("/", authorize, updateUser)



const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        const publicPath = path.resolve('public');
        console.log(publicPath);
        cb(null, publicPath); // Dosyanın kaydedileceği yol

    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Dosya adı ve uzantısı
        console.log(Date.now() + path.extname(file.originalname))

    }
});

const upload = multer({ storage: storage });

//
router.post("/", authorize, upload.single('img'), (req, res) => {

    console.log(req.body);
    const file = req.file;
    const imagePath = `${file.filename}`;
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
})


export default router