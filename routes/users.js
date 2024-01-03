import Express from "express";
import { authorize } from '../proxy.js';
import path from "path";
import multer from "multer";



import { getUser, updateUser, finduser } from "../controllers/user.js"; //.js

const router = Express.Router()



router.get("/", authorize, getUser)

router.put("/", authorize, updateUser)

router.get("/find", authorize, finduser)


export default router