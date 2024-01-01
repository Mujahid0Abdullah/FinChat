import express from "express";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import { db } from "../connect.js";



console.log("im here listening");
const app = express();
import authRoutes from "./routes/auths.js";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import commentRoutes from "./routes/comments.js";

import cookieParser from "cookie-parser";



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Tüm kaynaklara erişime izin verir
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // İzin verilen HTTP metodları
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"); // İzin verilen headerlar
    res.header("Access-Control-Allow-Credentials", true); // Kimlik doğrulaması yapılan isteklere izin verir
    next();
});

// CORS politikalarını uygulamak için cors modülünü kullanmaya gerek kalmayabilir
// Ancak, cors modülünü kullanmaya devam etmek isterseniz:
app.use(
    cors({
        origin: "*", // Tüm kaynaklara erişime izin verir
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // İzin verilen HTTP metodları
        credentials: true, // Kimlik doğrulaması yapılan isteklere izin verir
        preflightContinue: false, // OPTIONS ön isteklerini işleme alır
        optionsSuccessStatus: 204 // OPTIONS isteğine başarılı bir yanıt döndürür
    })
);
/*
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credential", true);
    next();
})*/
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

    id = req.query.postId;

    db.query(q, [id], (err, data) => {
        if (err) { return res.status(500).json(err); }

        return res.status(200).json(data);
    });
    /*
    const postDetails = {
        id: req.params.postID,
        title: 'Post Title',
        content: 'Post Content',
        // Diğer post özellikleri...
    };*/
    // Örnek bir HTML dosyasını göndermek istediğiniz sayfanın dizinini belirtin
});



app.get("/register", (req, res) => {
    console.log("register");

    const htmlPath = path.resolve('views', 'register.html');
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




app.use("/comments", commentRoutes);
app.use("/auths", authRoutes);
app.use("/posts", postRoutes);
app.use("/users", userRoutes);
























/*
app.use(
    cors({
        origin: "http://127.0.0.1:5500",
    })
);*/