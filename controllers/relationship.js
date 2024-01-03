import Express from "express";
import jwt from "jsonwebtoken";
import moment from "moment/moment.js";
import { db } from "../connect.js";



export const getRelationships = (req, res) => {
    const q = "SELECT followerUserId FROM relationships WHERE followedUserId = ?";

    db.query(q, [req.query.followedUserId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data.map(relationship => relationship.followerUserId));
    });
}



export const getRelation2 = (req, res) => {
    const q = "SELECT followerUserId FROM relationships WHERE followedUserId = ? and followerUserId= ? ";

    db.query(q, [req.query.followedUserId, req.userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data !== null && data.length > 0) {
            return res.status(200).json(true); // Veri var ve etkilenen satır sayısı pozitifse true döndür
        } else {
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