import axios from "axios"
import jwt from 'jsonwebtoken'

const isAuthenticated = async (req, res, next) => {
	if (req.session.accessToken) {
		const accessToken = req.session.accessToken
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
				req.user.user_id = req.session.user_id
				console.log(req.user)
				next()
			} else {
				res.status(401).json({ exists: false, message: "Unauthorized" })
			}
		} catch (error) {
			console.error("Error in API request:", error)
			res.status(500).json({ exists: false, message: "Internal Server Error" })
		}
	}
	else if(req.session.access_token) {
		const user_id = req.session.user_id
		console.log(user_id + " authenticated")
		const token = req.session.access_token;
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
	else if (req.session.user){
		console.log("twitter user found!")
		const {userName, userToken, name, picture}= req.session.user
		req.user = {userName: userName, name: name, token: userToken, picture: picture, user_id: req.session.user_id}
		next()
	}
	else {
		res.status(401).json({ exists: false, message: "Unauthorized" })
	}
}


export default isAuthenticated
