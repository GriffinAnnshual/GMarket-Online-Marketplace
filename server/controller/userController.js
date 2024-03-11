import User from "../Modals/userSchema.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { store } from "../app.js"



export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body

		const user = await User.findOne({ email: email, loginType: "username" })

		if (!user) {
			return res
				.status(401)
				.json({ exists: false, message: "User doesn't Exist" })
		}
		const isMatch = bcrypt.compare(password, user.password)

		if (!isMatch) {
			return res
				.status(401)
				.json({ exists: false, message: "Incorrect password" })
		} else {
			const currentUser = await User.findOne({
				email: email,
				loginType: "username",
			})
			console.log(currentUser)
			req.session.user_id = currentUser._id
			jwt.sign(
				{ email: email, name: user.name },
				"secretKey",
				{ expiresIn: "24h" },
				(err, token) => {
					if (err) {
						console.log("jwt signin failed")
					}
					console.log(token)
					req.session.access_token = token
					res.status(200).json({ success: true, token: token })
				}
			)
		}
	} catch (err) {
		return res.status(400).json({ success: false, message: err.message })
	}
}

export const registerUser =  async (req, res) => {
	try {
		const { email, password, username } = req.body
		const userNameExist = await User.findOne({ username: username })
		const userEmail = await User.findOne({
			email: email,
			loginType: "username",
		})
		if (userNameExist) {
			return res
				.status(401)
				.json({ exists: true, message: "Username Already taken" })
		} else if (userEmail) {
			return res
				.status(401)
				.json({ exists: true, message: "Email Already taken" })
		} else {
			const hashPassword = await bcrypt.hash(password, 10)
			const newUser = new User({
				email: email,
				name: username,
				username: username,
				password: hashPassword,
				loginType: "username",
			})
			await newUser.save()
			const currentUser = await User.findOne({
				email: email,
				loginType: "username",
			})
			const user_id = currentUser._id
			req.session.user_id = user_id
			jwt.sign(
				{ email: email, name: username, password: hashPassword },
				"secretKey",
				{ expiresIn: "24h" },
				(err, token) => {
					if (err) {
						console.log("jwt signin failed")
					}
					req.session.access_token = token
					res.status(200).json({ success: true, token: token })
				}
			)
		}
	} catch (err) {
		res.status(400).json({ success: false, message: err.message })
	}
}

export const logoutUser = (req, res) => {
	try {
		store.destroy(req.session.id)
		req.session.destroy()
		req.session = null
		console.log(req.session)
		res.status(200).json({ message: "Logout successfull" })
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

export const getUser =  (req, res) => {
	res.status(200).json(req.user)
}

export const addAddress =  (req, res) => {}
