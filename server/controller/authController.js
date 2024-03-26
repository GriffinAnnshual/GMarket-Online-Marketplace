
import LoginWithTwitter from "login-with-twitter"
import OAuth from "oauth-1.0a"
import passport from "../middleware/googleAuth.js"
import crypto from "crypto"
import User from "../Modals/userSchema.js"
import Cookies from 'universal-cookie'
import axios from 'axios'


const oauth = OAuth({
	consumer: {
		key: process.env.TWITTER_CLIENT_ID,
		secret: process.env.TWITTER_CLIENT_SECRET,
	},
	signature_method: "HMAC-SHA1",
	hash_function(base_string, key) {
		return crypto.createHmac("sha1", key).update(base_string).digest("base64")
	},
})

const tw = new LoginWithTwitter({
	consumerKey: process.env.TWITTER_CLIENT_ID,
	consumerSecret: process.env.TWITTER_CLIENT_SECRET,
	callbackUrl: "http://localhost:3000/api/v1/auth/twitter/callback",
})




export const redirectGoogle = async(req, res, next) => {
	const cookies = new Cookies(req.headers.cookie, { path: "/" })
	console.log(cookies)
	await passport.authenticate(
		"google",
		async function (err, user, accessToken) {
			if (err) {
				return next(err)
			}
			if (!user) {
				return res.redirect("/login")
			}
			req.logIn(user, async (loginErr) => {
				if (loginErr) {
					return next(loginErr)
				}
				const currectUser = await User.findOne({
					email: user.email,
					loginType: "google",
				})
				const user_id = currectUser._id
				req.session.user_id = user_id
				res.cookie("gmarket_user_token", accessToken, { path: "/" })
				res.cookie("loginType", "google", { path: "/" })
				res.redirect("http://localhost:5173/")
			})
		}
	)(req, res, next)
}

export const authTwitter =  (req, res) => {
	tw.login((err, tokenSecret, url) => {
		if (err) {
			console.log("Error in obtaining request token" + err.message)
			return res.status(401).send(err.message)
		}

		req.session.tokenSecret = tokenSecret
		res.redirect(url)
	})
}

export const authTwitterCallback =  async (req, res) => {
	const cookies = new Cookies(req.headers.cookie, { path: "/" })
	try {
		tw.callback(
			{
				oauth_token: req.query.oauth_token,
				oauth_verifier: req.query.oauth_verifier,
			},
			req.session.tokenSecret,
			async (err, user) => {
				if (err) {
					console.log("Error in twitter user authentication" + err.message)
					return res.status(err.status).send(err.message)
				}

				delete req.session.tokenSecret

				const { userToken, userTokenSecret } = user
				res.cookie("gmarket_user_token", {userToken, userTokenSecret}, { path: "/" })
				res.cookie("loginType", "twitter", { path: "/" })
				const request_data = {
					url: "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true",
					method: "GET",
				}

				await axios({
					url: request_data.url,
					method: request_data.method,
					headers: oauth.toHeader(
						oauth.authorize(request_data, {
							key: userToken,
							secret: userTokenSecret,
						})
					),
				})
					.then((response) => {
						const { profile_image_url, name } = response.data
						user["picture"] = profile_image_url
						user["name"] = name
						req.session.user = user
					})
					.catch((error) => {
						res
							.status(error.status)
							.json({ success: false, message: e.message })
					})

				const mongoUser = await User.findOne({
					username: req.session.user.userName,
					loginType: "twitter",
				})
				if (!mongoUser) {
					const newUser = new User({
						name: user.name,
						username: user.userName,
						loginType: "twitter",
						profilePic: user.picture,
					})

					await newUser.save()
				}
				const currentUser = await User.findOne({
					username: user.userName,
					loginType: "twitter",
				})
				const user_id = currentUser._id
				req.session.user_id = user_id
				res.redirect("http://localhost:5173/")
			}
		)
	} catch (e) {
		res.status(e.status).json({ success: false, message: e.message })
	}
}



