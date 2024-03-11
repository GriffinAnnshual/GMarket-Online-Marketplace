import express from 'express';
import isAuthenticated from '../../../middleware/userAuth.js'
const router = express.Router();
import {
    loginUser,
    registerUser,
    logoutUser,
    getUser
} from '../../../controller/userController.js'



router.post("/login", loginUser )
router.post("/register", registerUser)
router.post("/logout", logoutUser)
router.get("/getUser",isAuthenticated, getUser)



export default router