import Express from "express";
import bodyParser from "body-parser";
import { authorize } from '../proxy.js';
import { login, register, logout } from "../controllers/auth.js"; //.js
//authentication

const router = Express.Router()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.post("/login", urlencodedParser, login)
router.post("/register", register)

router.post("/logout", logout)

export default router