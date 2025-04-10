import {registerUser, loginUser, getAllUsers} from '../controllers/userController.js';
import express from "express"; 

const router = express.Router();

router.post('/signup', registerUser);

router.post('/login', loginUser);
router.get('/get', getAllUsers);

export default router;
