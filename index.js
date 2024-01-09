import express from "express";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import { db } from "./connect.js";
import multer from "multer";
import { uploadFile, generatePublicUrl } from "./googleimage.js"; //.js
import fetch from "node-fetch";
import dotenv from 'dotenv';
dotenv.config();



console.log("im here listening");
const app = express();
import authRoutes from "./routes/auths.js";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import commentRoutes from "./routes/comments.js";

import cookieParser from "cookie-parser";
import relationshipRoutes from "./routes/relationships.js"


//JSON PARSER
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//STATİC FİLES
app.use('/static', express.static("views"))
app.use(express.static("public"))


//CORS//-----------------------------------------------------
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
//-----------------------------------------------------

//--------------------------------------
app.use(express.json())
app.listen(8800, () => {
    console.log("listening");
    console.log("listeningZekeriyya");
});
app.use(cookieParser());
//--------------------------------

app.post('/getGPTResponse', async (req, res) => {
    try {
      const body = {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: req.body.content }],
        temperature: 1,
      };
  
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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'// + process.env.OPENKEY, // Use your actual API key here
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('There was an error!', error);
      res.status(500).json({ error: 'Server error' });
    }
  });


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


app.get("/followJs", (req, res) => {
    console.log("js");

    const htmlPath = path.resolve('views', 'follow.js');
    console.log(htmlPath);

    res.sendFile(htmlPath);
});




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), async (req, res) => {
    const file = req.file;
    const fileId = await uploadFile(file.filename);

    // uploadFile fonksiyonu dosyanın ID'sini döndürdüyse
    if (fileId) {
        // Dosya başarıyla yüklendi, fileId değeri kullanılabilir
        console.log(fileId);
        res.status(200).json({ fileId });
    } else {
        // Dosya yüklenemedi, hata oluştu
        res.status(500).json({ error: "Dosya yüklenemedi" });
    }
});/*
app.post("/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    res.status(200).json(uploadFile(file.filename));
    //json(file.filename);
});*/

app.use("/comments", commentRoutes);
app.use("/auths", authRoutes);
app.use("/posts", postRoutes);
app.use("/users", userRoutes);
app.use("/follow", relationshipRoutes)























