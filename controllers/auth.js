import { db } from "../connect.js"
//kriptografik kütüphane
import bcrypt from "bcryptjs";
// kullanıcı kimlik doğrulama
import jwt from "jsonwebtoken";
import { getPosts } from "./post.js";

export const register = (req, res) => {
    console.log("register")
    //check user if exists
    console.log(req.body)
    console.log(req.query)

    const q = "SELECT * FROM users WHERE username = ?"
    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("bu kullanıcı kayıdlı")
        console.log("Password:", req.body.password, data);
        //yeni kullanıcı oluşturma

        //hash password
        const Salt = bcrypt.genSaltSync(10); // şifreleme metodu
        const hashedPassword = bcrypt.hashSync(req.body.password, Salt)
        console.log("Salt:", Salt);

        const q2 = "INSERT INTO users (`username`,`email`,`password`,`name`) VALUE (?)"

        const values = [req.body.username, req.body.email, hashedPassword, req.body.name];

        db.query(q2, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).render("login.ejs");
            //json("kullanıcı oluşturuldu");

        });


    });

}

export const login = (req, res) => {
    console.log("login", req.body);
    const q = "SELECT * FROM users WHERE username = ?"
    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (!data.length) return res.status(408).json("bu kullanıcı bulunmadı");
        console.log("kullanıcı bulundu");

        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password); //data bir array ,
        if (!checkPassword) return res.status(400).json("username yada password yanlış.")
        const token = jwt.sign({ id: data[0].id }, "SecretKey");

        const { password, ...others } = data[0]; //password , diğer verilerden ayırmak


        res.cookie("accessToken", token, {
            httpOnly: true

        }).status(200).redirect("/home")
        //json(others)
        //redirect('http://127.0.0.1:5500/views/anasayfa.html')
        //render("anasayfa.ejs", { others });
        //.......redirect()
        console.log("login bitti");

    });

}
export const logout = (req, res) => {
    res.clearCookie("accessToken", { secure: true, sameSite: "none" }).status(200).json("user çıkış yaptı")
}