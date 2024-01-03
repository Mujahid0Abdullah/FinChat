import Express from "express";
import { authorize } from '../proxy.js';
import path from "path";
import multer from "multer";



import { getUser, updateUser } from "../controllers/user.js"; //.js

const router = Express.Router()



router.get("/", authorize, getUser)

router.put("/", authorize, updateUser)

export default router