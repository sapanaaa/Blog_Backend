import {createBlogPost, getALLBlogPosts, getBlogPostById} from '../controllers/blogController.js';
import express from "express"; 

const router = express.Router();

router.post('/create', createBlogPost);
router.get('/get', getALLBlogPosts);
router.get('/:id', getBlogPostById);


export default router;
