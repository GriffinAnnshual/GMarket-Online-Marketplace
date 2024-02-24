import bodyParser from 'body-parser';
import express from 'express';
import session from 'express-session'; 
import crypto from 'crypto';
import bcrypt from 'bcryptjs';  
import passport from './Middleware/googleAuth.js'
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose'
import MongoDBStore  from 'connect-mongodb-session';
import User from './Modals/userSchema.js'
import dotenv from 'dotenv'
import isAuthenticated from './Middleware/userAuth.js';
import cors from 'cors'
import jwt from 'jsonwebtoken'
import LoginWithTwitter from "login-with-twitter"
import OAuth from "oauth-1.0a"
import axios from 'axios'
import otpGenerator from 'otp-generator'
import { createClient } from 'redis'
import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import {dirname} from 'path'
import Stripe from 'stripe'
import Order from './Modals/ordersSchema.js'
import Payment from './Modals/paymentSchema.js'
dotenv.config()


const stripe = Stripe(process.env.VITE_STRIPE_SECRET_KEY)

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const oauth = OAuth({
	consumer: {
		key: process.env.VITE_APP_TWITTER_CLIENT_ID,
		secret: process.env.VITE_APP_TWITTER_CLIENT_SECRET,
	},
	signature_method: "HMAC-SHA1",
	hash_function(base_string, key) {
		return crypto.createHmac("sha1", key).update(base_string).digest("base64")
	},
})


const tw = new LoginWithTwitter({
	consumerKey: process.env.VITE_APP_TWITTER_CLIENT_ID,
	consumerSecret: process.env.VITE_APP_TWITTER_CLIENT_SECRET,
	callbackUrl: "http://localhost:3000/auth/twitter/callback",
})

const allowedOrigins = [
	"http://localhost:3000",
	"http://localhost:5173",
	"https://accounts.google.com",
	"https://api.twitter.com/",
]


// Create a express app.
const app = express();
// Cookie parser help to access the cookie values of the browser inside a server.
app.use(cookieParser())
// Body parser help to access the body values of the browser inside a server.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Initialize redis client
const client = await createClient({
	password: process.env.VITE_APP_REDIS_SECRET,
	socket: {
		host: "redis-18218.c326.us-east-1-3.ec2.cloud.redislabs.com",
		port: 18218,
	},
})
	.on("error", (err) => console.log("Redis Client Error", err))
	.connect()
console.log(client.isReady)

const uri = process.env.MONGO_URI

const secretKey = crypto.randomBytes(32).toString("hex")

mongoose.connect(uri)

const db = mongoose.connection

db.on("connected", () => {
	console.log("Connected to MongoDB")
})


const MongoDBSession = MongoDBStore(session)

const store = new MongoDBSession({
	uri: uri,
	collection: "MySessions",
})

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,
	secure: false,
	auth: {
		user: "noreply.gmarket@gmail.com",
		pass: "esgx wvli yrxl xkpv",
	},
})

app.use(
	session({
		secret: secretKey,
		resave: false,
		saveUninitialized: false,
        cookie:{
            maxAge: 3600000,
        },
        store: store,
	})
)

app.use(cors(
    {
        origin: function (origin, callback) {
            if (!origin) return callback(null, true)
            if (allowedOrigins.indexOf(origin) === -1) {
                var msg =
                    "The CORS policy for this site does not " +
                    "allow access from the specified Origin."
                return callback(new Error(msg), false)
            }
            return callback(null, true)
        },
        credentials: true,
    }
))



app.get(
	"/auth/google",
	passport.authenticate("google", { scope: ["email", "profile"] })

)


app.get("/oauth2/redirect/google", async function (req, res, next) {
	await passport.authenticate("google", async function (err, user, accessToken) {
		if (err) {
			return next(err)
		}
		if (!user) {
			return res.redirect("/login")
		}
		req.logIn(user, async(loginErr) => {
			if (loginErr) {
				return next(loginErr)
			}
			const currectUser = await User.findOne({ email: user.email, loginType: "google" })
			const user_id = currectUser._id
			req.session.user_id = user_id
            req.session.accessToken = accessToken
            res.redirect("http://localhost:5173/")
		})
	})(req, res, next)
})


app.get("/auth/twitter",(req,res)=>{
    tw.login((err,tokenSecret,url)=>{
        if(err){
            console.log("Error in obtaining request token"+ err.message);
            return res.status(401).send(err.message);  
        }

        req.session.tokenSecret = tokenSecret;
        res.redirect(url)
    })
})



app.get("/auth/twitter/callback", async(req,res)=>{
    try{
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
				const currentUser = await User.findOne({username: user.userName, loginType: "twitter"})
				const user_id = currentUser._id
				req.session.user_id = user_id
				res.redirect("http://localhost:5173/")
			}
		)
    }catch(e){
        res.status(e.status).json({success: false, message: e.message})
    }
})


app.post("/login", async(req,res)=>{
   try{
     const {email, password} = req.body;

    const user = await User.findOne({ email: email, loginType: "username"});

    if (!user){
        return res.status(401).json({ exists: false, message: "User doesn't Exist" });
    }
    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({ exists: false, message: 'Incorrect password' });
    }
    else{
		const currentUser = await User.findOne({ email: email, loginType: "username" })
		const user_id = currentUser._id
		req.session.user_id = user_id
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
   }catch(err){
    return res.status(400).json({success: false, message: err.message})
   }
})



app.post('/register', async (req, res) => {
try{
    const { email, password, username } = req.body
		const userNameExist = await User.findOne({ username: username })
        const userEmail = await User.findOne({
					email: email,
					loginType: "username",
				})
        if  (userNameExist){
            return res.status(401).json({ exists: true, message: "Username Already taken" })
        }
        else if (userEmail){
            return res.status(401).json({ exists: true, message: "Email Already taken" }) 
        }
        else{
            const hashPassword = await bcrypt.hash(password, 10)
            const newUser = new User({
                email: email,
                name: username,
                username : username,
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
		
}catch(err){
    res.status(400).json({success: false, message:err.message});
}
});

app.get('/getUser',isAuthenticated,function(req, res){
   res.status(200).json(req.user)
})


app.post("/send-otp", async(req,res)=>{
	try{
	
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
	

	await client.set(email, hashedOtp, "EX", 300)

		const getHTMLTemplate = (templateName, params) => {
			const templatePath = path.join(
				__dirname,
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
			console.log('Error:', error);
		} else {
			console.log('Email sent:', info.response);
		}
		})
		req.session.email = email
		res.status(200).json({ email: otp, message: "email successfully sent" })

	}catch(err){
		console.log(err)
		res.status(500).json({ message: err.message })
	}
})


app.get("/verify/email", async(req,res)=>{

const otp = req.query.verify
const mail = req.session.email
console.log(otp)
console.log(mail)
const isMatch = bcrypt.compareSync(otp, await client.get(mail))
if (!isMatch){
	res.status(401).json({ exists: false, message: 'Incorrect OTP' });
}else{
	res.status(200).json({ exists: true, message: 'OK' }); 
}
})



app.post("/logout",(req, res)=>{
	try{
		store.destroy(req.session.id)
		req.session.destroy()
		req.session = null
		console.log(req.session)
		res.status(200).json({message: "Logout successfull"})
	}catch(err){
		res.status(400).json({message: err.message})
	}
})


//---------------------------------stripe integration routes --------------------------------------

const generate_PriceID = async (itemList) => {
	// Use Promise.all to wait for all asynchronous operations to complete
	const updatedItemList = await Promise.all(
		itemList.map(async (items) => {
			if(items !== null){
				const product = await stripe.products.create({
				name: items.name,
			})
			const price = await stripe.prices.create({
				product: product.id,
				unit_amount: (items.price).toFixed(2) * 100,
				currency: "INR",
			})
			return { price: price.id, quantity: items.quantity }
			}
		})
	)

	return updatedItemList
}

const DOMAIN_NAME = "http://localhost:5173"

app.post("/create-checkout-session", async (req, res) => {
	const { itemList } = req.body
	console.log(itemList)

	const items = await generate_PriceID(itemList)
	const session = await stripe.checkout.sessions.create({
		ui_mode: "embedded",
		line_items: items,
		mode: "payment",
		return_url: `${DOMAIN_NAME}/return?session_id={CHECKOUT_SESSION_ID}`,
	})
	res.send({ clientSecret: session.client_secret })
})

app.get("/session-status", async (req, res) => {
	const session = await stripe.checkout.sessions.retrieve(req.query.session_id)

	res.send({
		status: session.status,
		customer_email: session.customer_details.email,
	})
})


//-----------------------------------------------order-routes------------------------------------------

app.post("/add/orders",(req, res) => {
	const { itemList, totalPrice, totalQuantity, address } = req.body

})


//-----------------------------------------------payments-routes----------------------------------------

app.get("/add/payments",(req, res) => {

})


app.post("/add/address",(req,res)=>{
})


app.listen(3000, () => {
    console.log("Listening on http://localhost:3000");
});
