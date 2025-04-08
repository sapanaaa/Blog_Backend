import {createBlogPost, getALLBlogPosts} from '../controllers/blogController.js';
import express from "express"; 

const router = express.Router();

router.post('/create', createBlogPost);
router.get('/get', getALLBlogPosts);


export default router;
