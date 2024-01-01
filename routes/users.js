import Express from "express";
import { getUser, updateUser } from "../controllers/user.js"; //.js

const router = Express.Router()


router.get("/", getUser)

router.put("/", updateUser)

export default router