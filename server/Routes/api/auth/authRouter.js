import { authTwitter, authTwitterCallback, redirectGoogle } from "../../../controller/authController.js"
import express from "express"
import passport from "../../../middleware/googleAuth.js"

const router = express.Router()



router.get(
	"/google",
	passport.authenticate("google", { scope: ["email", "profile"] })
)
router.route("/oauth2/redirect/google").get(redirectGoogle)
router.route("/twitter").get( authTwitter)
router.route("/twitter/callback").get( authTwitterCallback)



export default router