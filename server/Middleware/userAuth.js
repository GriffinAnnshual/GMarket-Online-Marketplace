import axios from "axios"

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
				next()
			} else {
				res.status(401).json({ exists: false, message: "Unauthorized" })
			}
		} catch (error) {
			console.error("Error in API request:", error)
			res.status(500).json({ exists: false, message: "Internal Server Error" })
		}
	} else {
		res.status(401).json({ exists: false, message: "Unauthorized" })
	}
}

export default isAuthenticated
