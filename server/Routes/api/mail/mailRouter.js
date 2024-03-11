import { sentOTP, verifyEmail } from "../../../controller/mailController.js"
import express from "express"
import isAuthenticated from "../../../middleware/userAuth.js"

const router = express.Router()



router.post("/sent-otp", isAuthenticated, sentOTP)
router.route("/verify/email").get(isAuthenticated, verifyEmail)


export default router