import express from 'express';
import isAuthenticated from '../../../middleware/userAuth.js'
const router = express.Router();
import {
    loginUser,
    registerUser,
    logoutUser,
    getUser,
    getDetails,
    updateDetails,
    uploadAvatar
} from '../../../controller/userController.js'



router.post("/login", loginUser )   
router.post("/register", registerUser)
router.post("/logout", logoutUser)
router.get("/getUser",isAuthenticated, getUser)
router.route("/details/:user_id").get(isAuthenticated, getDetails)
router.route("/updateDetails/:user_id").post(isAuthenticated, updateDetails)
router.route("/uploadAvatar/:user_id").post(isAuthenticated, uploadAvatar)
// router.post("/addOrder", isAuthenticated, addOrder)
// router.get('/getOrders/:user_id', isAuthenticated, getOrders)




export default router