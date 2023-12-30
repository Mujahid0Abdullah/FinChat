import Express from "express";
import { getLikes } from "../controllers/like.js"; //.js

const router = Express.Router()

router.get("/", getLikes)
//router.post("/", addLike)
router.get("/comment", (req, res) => {
    res.send("here should be comment");
})

export default router