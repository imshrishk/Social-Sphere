import Express from "express";
import { getPosts,addPost } from "../controllers/posts.js";

const router = Express.Router()

router.get("/",getPosts)
router.post("/",addPost)

export default router