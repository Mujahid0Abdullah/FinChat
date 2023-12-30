import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment/moment.js";

export const getComments = (req, res) => {

    const q = "SELECT c.* ,u.id AS userId , name , profilePic FROM comments c JOIN users u ON (u.id= c.userId) WHERE c.postId = ? ORDER BY c.createdAt DESC "
    db.query(q, [req.query.postId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });

}
export const addComment = (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("giriş yapılmadı")

    jwt.verify(token, "SecretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");


        const q = "INSERT INTO comments (`desc`, `postId`, `userId`, `createdAt`) VALUES (?)";

        const descValue = req.body.desc;//req çalışmıyor
        console.log(descValue);
        const values = [
            descValue,
            req.body.postId,
            userInfo.id,

            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("comment eklendi");
        });
    })

}


export const deleteComment = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("giriş yapılmadı");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const commentId = req.params.id;
        const q = "DELETE FROM comments WHERE `id` = ? AND `userId` = ?";

        db.query(q, [commentId, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.affectedRows > 0) return res.json("Comment has been deleted!");
            return res.status(403).json("You can delete only your comment!");
        });
    });
};