import express from "express";
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
    res.header("Access-Control-Allow-Credential", true);
    next();
})
app.use(express.json())
app.listen(8800, () => {
    console.log("listening");
});
app.use(cookieParser());

app.get("/register", (req, res) => {

    res.render("register.ejs")
})

app.get("/login", (req, res) => {
    //C:/Users/Acer/Documents/GitHub/proje
    res.render('./views/login.ejs');
})


app.use(
    cors({
        origin: "http://127.0.0.1:5500",
    })
);

app.get("/", (req, res) => {
    console.log("Anasayfa");

    // const htmlPath = path.join(__dirname, '/public/anasayfa.html');
    res.sendFile('C:/Users/Acer/Documents/GitHub/proje/views/anasayfa.html');
});




app.use("/comments", commentRoutes);
app.use("/auths", authRoutes);
app.use("/posts", postRoutes);
app.use("/users", userRoutes);
