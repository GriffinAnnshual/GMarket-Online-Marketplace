import nodemailer from "nodemailer"
import fs from "fs"
import bcrypt from "bcryptjs"
import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"
import otpGenerator from "otp-generator"
import {connectRedis} from '../data/redis.js'
import User from '../Modals/userSchema.js'


const Redisclient = connectRedis()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,
	secure: false,
	auth: {
		user: "noreply.gmarket@gmail.com",
		pass: "esgx wvli yrxl xkpv",
	},
})

export const sentOTP =  async (req, res) => {
	try {
		const { email, name } = req.body
		const userNameExist = await User.findOne({ username: name })
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
		}
		const otp = otpGenerator.generate(6, {
			upperCaseAlphabets: false,
			specialChars: false,
		})
		const salt = bcrypt.genSaltSync(9)
		const hashedOtp = bcrypt.hashSync(otp, salt)

		await Redisclient.set(email, hashedOtp, "EX", 300)

		const getHTMLTemplate = (templateName, params) => {
			const templatePath = path.join(
				process.cwd(),
				"public",
				"templates",
				`${templateName}.html`
			)
			let template = fs.readFileSync(templatePath, "utf-8")

			for (const key in params) {
				const regex = new RegExp(`{{${key}}}`, "g")
				template = template.replace(regex, params[key])
			}

			return template
		}
		const mailOptions = {
			to: email,
			subject: "Welcome to GMarket! Confirm Your Account with OTP Verification",
			html: getHTMLTemplate("mailTemplate", {
				otp_code: otp,
				to_mail: email,
				customer_name: name,
			}),
		}
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.log("Error:", error)
			} else {
				console.log("Email sent:", info.response)
			}
		})
		req.session.email = email
		res.status(200).json({ email: otp, message: "email successfully sent" })
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: err.message })
	}
}


export const verifyEmail =  async (req, res) => {
	const otp = req.query.verify
	const mail = req.session.email
	console.log(otp)
	console.log(mail)
	const isMatch = bcrypt.compareSync(otp, await Redisclient.get(mail))
	if (!isMatch) {
		res.status(401).json({ exists: false, message: "Incorrect OTP" })
	} else {
		res.status(200).json({ exists: true, message: "OK" })
	}
}