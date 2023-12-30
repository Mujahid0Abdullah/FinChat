import Express from "express";
import { getUser } from "../controllers/user.js"; //.js

const router = Express.Router()


router.get("/", getUser)



export default router