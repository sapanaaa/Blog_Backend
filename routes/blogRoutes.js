import {createBlogPost, getALLBlogPosts, getBlogPostById} from '../controllers/blogController.js';
import express from "express"; 
import { verifyToken, authorize } from '../middlewares/authMiddleware.js';
import { isAdmin, isSuperAdmin } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/create',verifyToken, authorize, createBlogPost);
router.get('/get', getALLBlogPosts);
router.get('/:id', getBlogPostById);


export default router;
