import {createBlogPost} from '../controllers/blogController.js';
import express from "express"; 

const router = express.Router();

router.post('/create', createBlogPost);

export default router;
