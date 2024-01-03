import Express from "express";
import bodyParser from "body-parser";
import multer from "multer"
import path from "path";
import { getRelationships, addRelationship } from "../controllers/relationship.js"; //.js
import jwt from "jsonwebtoken";
import moment from "moment/moment.js";
import { db } from "../connect.js";
import { authorize } from '../proxy.js';


const router = Express.Router()

router.get("/", getRelationships)
router.post("/", authorize, addRelationship)
//router.delete("/", deleteRelationship)


export default router


