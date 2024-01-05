import Express from "express";
import jwt from "jsonwebtoken";
import moment from "moment/moment.js";
import { db } from "../connect.js";



export const getRelationships = (req, res) => {
    const q = "SELECT r.* ,u.id, name, profilePic  FROM relationships r JOIN users u ON (u.id = r.followerUserId) WHERE r.followedUserId = ?";
    let id = req.query.followedUserId;
    console.log(id)
    if (id == 0) { id = req.userInfo.id }
    console.log(id)
    db.query(q, [id], (err, data) => {
        if (err) return res.status(500).json(err);
        console.log(data)

        return res.status(200).json(data);
    });
}

export const getmyRelationships = (req, res) => {
    const q = "SELECT r.* ,u.id, name, profilePic  FROM relationships r JOIN users u ON (u.id = r.followedUserId) WHERE r.followerUserId = ?";
    //"SELECT p.*, u.id AS userId, name, profilePic FROM posts p JOIN users u ON (u.id = p.userId) WHERE u.id=? ORDER BY p.createdAt DESC"
    let id = req.query.followerUserId;
    console.log(id)
    if (id == 0) { id = req.userInfo.id }
    console.log(id)

    db.query(q, [id], (err, data) => {
        if (err) return res.status(500).json(err);
        console.log(data)

        return res.status(200).json(data);
    });
}


export const getRelation2 = (req, res) => {
    const q = "SELECT followerUserId FROM relationships WHERE followedUserId = ? and followerUserId= ? ";
    console.log("qu" + req.query.followedUserId);
    console.log(req.userInfo.id);

    db.query(q, [req.query.followedUserId, req.userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data !== null && data.length > 0) {
            console.log(data + "t" + data.length);

            return res.status(200).json(true); // Veri var ve etkilenen satır sayısı pozitifse true döndür

        } else {
            console.log(data + "f" + data.length);

            return res.status(200).json(false); // Veri null veya etkilenen satır sayısı 0 veya negatifse false döndür
        }


    });
}

export const addRelationship = (req, res) => {


    const q = "INSERT INTO relationships (`followerUserId`,`followedUserId`) VALUES (?)";
    const values = [
        req.userInfo.id,
        req.body.userId
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Following" + data);
    });

};

export const deleteRelationship = (req, res) => {

    const q = "DELETE FROM relationships WHERE `followerUserId` = ? AND `followedUserId` = ?";

    db.query(q, [req.userInfo.id, req.body.userId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Unfollow");
    });

};