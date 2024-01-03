import Express from "express";
import bodyParser from "body-parser";
import path from "path";
import { getRelationships, addRelationship, getRelation2, deleteRelationship } from "../controllers/relationship.js"; //.js
import jwt from "jsonwebtoken";
import moment from "moment/moment.js";
import { db } from "../connect.js";
import { authorize } from '../proxy.js';


const router = Express.Router()

router.get("/", getRelationships)
router.post("/", authorize, addRelationship)
router.delete("/", authorize, deleteRelationship)

router.get("/check", authorize, getRelation2)



export default router


