import GoogleStrategy from "passport-google-oauth2"
import passport from "passport"
import dotenv from 'dotenv'
import User from "../Modals/userSchema.js"
import mongoose from "mongoose"
dotenv.config()


const uri = process.env.MONGO_URI

mongoose.connect(uri)
const db = mongoose.connection

db.on("connected", () => {
	console.log("Mongoose is connected")
})


passport.use(
	new GoogleStrategy.Strategy(
		{
			clientID: process.env.VITE_APP_CLIENT_ID,
			clientSecret: process.env.VITE_APP_CLIENT_SECRET,
			callbackURL: "/oauth2/redirect/google",
			passReqToCallback: true,
		},
		function (request, accessToken, refreshToken, profile, cb) {
			User.updateOne(
				{ google_UserID: profile.id },
				{ google_UserID: profile.id,
					email: profile.email,
					name: profile.displayName,
					profilePic: profile.picture
				},
				{ upsert: true }
			)
				.then(() => {
					console.log("profile inserted or found")
					return cb(null, profile,accessToken)
				})
				.catch((err) => {
					console.log(err)
					return cb(err)
				})
		}
	)
)

passport.serializeUser(function (User, cb) {
	cb(null, User.id)
})
passport.deserializeUser(function (User, cb) {
	cb(null, User.id)
})




export default passport;