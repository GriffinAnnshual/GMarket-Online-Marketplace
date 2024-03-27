import express from 'express';
import isAuthenticated from '../../../middleware/userAuth.js'
import multer from 'multer'


const router = express.Router();
import {
    loginUser,
    registerUser,
    logoutUser,
    getUser,
    getDetails,
    updateDetails,
    uploadAvatar,
    removeAvatar
} from '../../../controller/userController.js'


const upload = multer()
router.post("/login", loginUser )   
router.post("/register", registerUser)
router.post("/logout", logoutUser)
router.get("/getUser",isAuthenticated, getUser)
router.route("/details/:user_id").get(isAuthenticated, getDetails)
router.route("/updateDetails/:user_id").post(isAuthenticated, updateDetails)
router.route("/uploadAvatar/:user_id").post(isAuthenticated,upload.single('image'), uploadAvatar)
router.route("/removeAvatar/:user_id").get(isAuthenticated, removeAvatar)
// router.post("/addOrder", isAuthenticated, addOrder)
// router.get('/getOrders/:user_id', isAuthenticated, getOrders)




export default router