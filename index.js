import express from "express";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import { db } from "./connect.js";
import multer from "multer";



console.log("im here listening");
const app = express();
import authRoutes from "./routes/auths.js";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import commentRoutes from "./routes/comments.js";
import imgRoutes from "./googleimage.js";
import cookieParser from "cookie-parser";
import relationshipRoutes from "./routes/relationships.js"



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});


app.use(
    cors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
        preflightContinue: false,
        optionsSuccessStatus: 204
    })
);

app.use(express.json())
app.listen(8800, () => {
    console.log("listening");
    console.log("listeningZekeriyya");
});
app.use(cookieParser());





app.get("/home", (req, res) => {
    console.log("Anasayfa");

    const htmlPath = path.resolve('views', 'anasayfa.html');
    console.log(htmlPath);

    res.sendFile(htmlPath);
});




app.get("/CommentPage", (req, res) => {
    // Burada post ID'sini almak istediğiniz postun detaylarını alın
    // postDetails değişkeni örnek olarak bir postun detaylarını içeriyor olsun


    const q = "SELECT p.*, u.id AS userId, name, profilePic FROM posts p JOIN users u ON (u.id = p.userId) WHERE p.id=? ORDER BY p.createdAt DESC";
    console.log("q" + req.query);
    //console.log("p" + req.param);

    const id = req.query.postId;

    db.query(q, [id], (err, data) => {
        if (err) { return res.status(500).json(err); }

        return res.status(200).json(data);
    });


    // Örnek bir HTML dosyasını göndermek istediğiniz sayfanın dizinini belirtin
});



app.get("/register", (req, res) => {
    console.log("register");

    const htmlPath = path.resolve('views', 'register.html');
    console.log(htmlPath);

    res.sendFile(htmlPath);
});


app.get("/profile", (req, res) => {
    console.log("profile");

    const htmlPath = path.resolve('views', 'profile.html');
    console.log(htmlPath);

    res.sendFile(htmlPath);
});

app.get("/OthersProfile", (req, res) => {
    console.log("profile");

    const htmlPath = path.resolve('views', 'OthersProfile.html');
    console.log(htmlPath);

    res.sendFile(htmlPath);
});



app.get("/post", (req, res) => {
    -
        console.log("getpost");

    const htmlPath = path.resolve('views', 'CommentThePost.html');
    console.log(htmlPath);

    res.sendFile(htmlPath);

});

app.get("/", (req, res) => {
    console.log("login");

    const htmlPath = path.resolve('views', 'login.html');
    console.log(htmlPath);

    res.sendFile(htmlPath);
});



app.get("/profilecss", (req, res) => {
    console.log("css");

    const htmlPath = path.resolve('views', 'profile.css');
    console.log(htmlPath);

    res.sendFile(htmlPath);
});


app.get("/anasayfaJs", (req, res) => {
    console.log("js");

    const htmlPath = path.resolve('views', 'anasayfa.js');
    console.log(htmlPath);

    res.sendFile(htmlPath);
});


app.get("/popupJs", (req, res) => {
    console.log("js");

    const htmlPath = path.resolve('views', 'popups.js');
    console.log(htmlPath);

    res.sendFile(htmlPath);
});



app.get("/upload", (req, res) => {
    console.log("photo");

    const htmlPath = path.resolve('public', "uploads", '1703618127158.png');
    console.log(htmlPath);

    res.sendFile(htmlPath);
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve("public"))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage })

app.post("/upload", upload.single("img"), (req, res) => {


    res.json(req.file)
});

app.use("/comments", commentRoutes);
app.use("/auths", authRoutes);
app.use("/posts", postRoutes);
app.use("/users", userRoutes);
app.use("/img", imgRoutes);
app.use("/follow", relationshipRoutes)

























/*
app.use(
    cors({
        origin: "http://127.0.0.1:5500",
    })
);*/