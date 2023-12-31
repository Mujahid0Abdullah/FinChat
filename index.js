import express from "express";

import { dirname } from "path";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";


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

app.get("/register", (req, res) => {

    res.render("register.ejs")
})

app.get("/login", (req, res) => {
    //C:/Users/Acer/Documents/GitHub/proje
    res.redirect('./views/login.html');
})



app.get("/", (req, res) => {
    console.log("Anasayfa");

    const htmlPath = path.resolve('views', 'login.html');
    res.sendFile(htmlPath);
});

/*
app.use(
    cors({
        origin: "http://127.0.0.1:5500",
    })
);*/
/*
app.get("/", (req, res) => {
    console.log("Anasayfa");

    //const htmlPath = path.join(__dirname, 'views', 'anasayfa.html');
    //res.sendFile(htmlPath);
    res.send("Ana sayfaya hoş geldiniz!"); // Kök dizine gelen isteğe yanıt olarak bir metin gönderir

});*/




app.use("/comments", commentRoutes);
app.use("/auths", authRoutes);
app.use("/posts", postRoutes);
app.use("/users", userRoutes);
