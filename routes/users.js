import Express from "express";
import { authorize } from '../proxy.js';

import { getUser, updateUser } from "../controllers/user.js"; //.js

const router = Express.Router()


router.get("/", getUser)

router.put("/", authorize, updateUser)

export default router