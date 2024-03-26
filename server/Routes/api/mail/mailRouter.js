import { sentOTP, verifyEmail } from "../../../controller/mailController.js"
import express from "express"
import isAuthenticated from "../../../middleware/userAuth.js"

const router = express.Router()



router.post("/send-otp", sentOTP)
router.route("/verify/email").get(verifyEmail)


export default router