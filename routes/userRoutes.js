import {registerUser, loginUser, logoutUser} from '../controllers/authController.js';
import {getAllUsers} from '../controllers/userController.js';
import express from "express"; 

const router = express.Router();

router.post('/signup', registerUser);

router.post('/login', loginUser);
router.get('/get', getAllUsers);
router.get('/logout', logoutUser);

export default router;
