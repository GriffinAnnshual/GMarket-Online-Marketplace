import axios from "axios"
import jwt from 'jsonwebtoken'
import Cookies from 'universal-cookie';
import crypto from "crypto"
import OAuth from "oauth-1.0a"
import User from '../Modals/userSchema.js'
import {config} from 'dotenv'
config({
	path: "./.env",
})

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


const isAuthenticated = async (req, res, next) => {
	const user_id = req.session.user_id
	const cookies = new Cookies(req.headers.cookie || '', { path: '/' });
	const loginType = cookies.get('loginType')



	if (loginType === 'google') {
		const accessToken = cookies.get('gmarket_user_token')
		const config = {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}
     
		try {
			const response = await axios.get(
				"https://www.googleapis.com/oauth2/v3/userinfo",
				config
			)

			if (response.data) {
				req.user = await response.data
				req.user.user_id = user_id
				next()
			} else {
				res.status(401).json({ exists: false, message: "Unauthorized" })
			}
		} catch (error) {
			console.error("Error in API request:", error)
			res.status(500).json({ exists: false, message: "Internal Server Error" })
		}
	}
	else if(loginType === 'jwt') {
		
		const token = cookies.get("gmarket_user_token")
		jwt.verify(token, "secretKey", function(err){
			if(err){
				console.log("Error in API request:", err)
			}
			else{
				console.log("session token verified found!")
				req.user = jwt.decode(token)
				req.user.user_id = user_id
				next()
			}
		})
	}
	else if (loginType === 'twitter'){

		const { userToken, userTokenSecret } = cookies.get("gmarket_user_token")

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
		.then(async(response) => {
				const currentUser = await User.findOne({_id: user_id})
				const { profile_image_url, name } = response.data
				req.user = {
					userName: currentUser.userName,
					name: name,
					token: userToken,
					picture: profile_image_url,
					user_id: user_id,
				}
			})
			.catch((error) => {
				console.log(error)
				res.status(400).json({ success: false, message: error.message })
			})		
	
		next()
	}
	else {
		res.status(401).json({ exists: false, message: "Unauthorized" })
	}
}


export default isAuthenticated
