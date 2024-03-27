import User from "../Modals/userSchema.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"	
import { store } from "../app.js"
import cloudinary from 'cloudinary'
import { RootNodesUnavailableError } from "redis"

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
			req.session.user_id = currentUser._id
			jwt.sign(
				{ email: email, name: user.name },
				"secretKey",
				{ expiresIn: "24h" },
				(err, token) => {
					if (err) {
						console.log("jwt signin failed")
					}
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


export const getDetails = async(req, res) => {
	try{
		const user_id = req.params.user_id
		const userDetails = await User.find({_id: user_id })
		res.status(200).json({'status': 'ok', 'userDetails': userDetails[0]})
	}catch(err){
		console.log("Error occurred:", err)
		res.status(400).json({'status': 'error', 'error': err})
	}
}

export const updateDetails =  async(req,res) =>{
	try{
		let changes = {};
		console.log(req.body)
		const details = req.body.details;
		for (let key in details){
			if (details[`${key}`]){
				changes[`${key}`] = details[`${key}`]
			}
		}
		const user_id = req.params.user_id
		await User.updateOne({_id: user_id},changes)
		.then(()=>{
			res.status(200).json({success: true, message: 'Updated successfully'})
		})
		.catch(err => {
			res.status(400).json({success: false, message: err.message})
		})

	}catch(err){
		console.log(err)
		res.status(400).json({success: false, message: err.message})
	}

}


export const uploadAvatar = async (req, res) => {
	try {
		const user_id = req.params.user_id
		const arrayBuffer = req.file.buffer

		// Upload image to Cloudinary
		const uploadResult = await new Promise((resolve, reject) => {
			cloudinary.v2.uploader
				.upload_stream((error, result) => {
					if (error) {
						reject(error)
					} else {
						resolve(result)
					}
				})
				.end(arrayBuffer)
		})

		// Update user profile with Cloudinary URL
		await User.updateOne(
			{ _id: user_id },
			{ profilePic: uploadResult.secure_url }
		)

		return res
			.status(200)
			.json({
				status: true,
				message: "Avatar updated successfully",
				image_url: uploadResult.secure_url,
			})
	} catch (error) {
		console.error("Error uploading avatar:", error)
		return res.status(400).json({ status: false, message: error.message })
	}
}


export const removeAvatar = async(req,res) =>{
	try{
		const user_id = req.params.user_id
		await User.updateOne({_id:user_id},{profilePic: null})
		res.status(200).json({success:true, message: 'Avatar removed successfully'})
	}catch(err){
		res.status(400).json({success:false, message: err.message})
	}
}