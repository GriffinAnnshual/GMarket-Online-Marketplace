import bodyParser from 'body-parser';
import express from 'express';
import session from 'express-session'; 
import crypto from 'crypto';
import bcrypt from 'bcryptjs';  
import passport from './Middleware/auth.js'
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
import got from 'got'

dotenv.config()

const oauth = OAuth({
	consumer: {
		key: process.env.VITE_APP_TWITTER_CLIENT_ID,
		secret: process.env.VITE_APP_TWITTER_CLIENT_SECRET,
	},
	signature_method: "HMAC-SHA1",
	hash_function: (baseString, key) =>
		crypto.createHmac("sha1", key).update(baseString).digest("base64"),
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
const secretKey = crypto.randomBytes(32).toString("hex")

// Create a express app.
const app = express();
// Cookie parser help to access the cookie values of the browser inside a server.
app.use(cookieParser())
// Body parser help to access the body values of the browser inside a server.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const uri = process.env.MONGO_URI

const db = mongoose.connect(uri)

const MongoDBSession = MongoDBStore(session)

const store = new MongoDBSession({
	uri: uri,
	collection: "MySessions",
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


app.get("/oauth2/redirect/google", function (req, res, next) {
	passport.authenticate("google", function (err, user, accessToken) {
		if (err) {
			return next(err)
		}
		if (!user) {
			return res.redirect("/login")
		}

		req.logIn(user, (loginErr) => {
			if (loginErr) {
				return next(loginErr)
			}
            req.session.accessToken = accessToken
            res.redirect("http://localhost:5173/")
		})
	})(req, res, next)
})

app.get("/auth/twitter",(req,res)=>{
    tw.login((err,tokenSecret,url)=>{
        if(err){
            console.log("Error in obtaining request token"+ err.message);
            return res.status(401).send(err.message);  // if response is sent at the middle then return should be used as. Else it throws error
        }

        req.session.tokenSecret = tokenSecret;
        console.log(url)
        res.redirect(url)
    })
})

// const getUserProfile = async (user) => {
// 	const { userId, userToken, userTokenSecret } = user

// 	try {
// 		const request_data = {
// 			url: `https://api.twitter.com/2/users/${userId}`,
// 			method: "GET",
// 		}

// 		const token = {
// 			key: userToken,
// 			secret: userTokenSecret,
// 		}

// 		const headers = oauth.toHeader(oauth.authorize(request_data, token))

// 		const res = await got(request_data.url, {
// 			method: request_data.method,
// 			headers: {
//                 Authorization: headers["Authorization"]
//             }
// 		})

// 		const userProfile = JSON.parse(res.body)
//         console.log(userProfile)
// 		return userProfile
// 	} catch (error) {
// 		console.error("Error fetching user profile:", error)
// 		return null
// 	}
// }

app.get("/auth/twitter/callback", async(req,res)=>{
    tw.callback({
        oauth_token: req.query.oauth_token,
        oauth_verifier: req.query.oauth_verifier }, req.session.tokenSecret , async(err,user)=>{
          
            if (err){
                console.log("Error in twitter user authentication"+ err.message);
                return res.status(err.status).send(err.message);
            }

            delete req.session.tokenSecret
            req.session.user = user

            const mongoUser = await User.findOne({name: req.session.user.userName, loginType:"Twitter"})
            if(!mongoUser){
            const newUser = new User({
                            name: user.userName,
							Username: user.userName,
							loginType: "Twitter",
						})

						await newUser.save()
            }
            res.redirect("http://localhost:5173/")
    })
})


app.post("/login", async(req,res)=>{
   try{
     const {email, password} = req.body;
    console.log(req.body);

    const user = await User.findOne({ email: email, loginType: "Normal"});

    if (!user){
        console.log("User not found");
        return res.status(401).json({ exists: false, message: 'User not found' });
    }
    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
        console.log("Incorrect password");
        return res.status(401).json({ exists: false, message: 'Incorrect password' });
    }
    else{
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
    return res.status(400).json({success: false, message: "Invalid credentials"})
   }
})



app.post('/register', async (req, res) => {

    const { email, password, username } = req.body;
    const user = await User.findOne({ email: email , loginType: "Normal"});

    if (user) {
        console.log("User already exists");
        return res.status(401).json({ exists: true, message: 'User already exists' });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        email: email,
        name: username,
        password: hashPassword,
        loginType: "Normal",
    })
    await newUser.save();
    jwt.sign(
        { email: email, name: username, password: hashPassword },
        "secretKey",
        { expiresIn: "24h" },
        (err, token) => {
            if (err) { console.log("jwt signin failed") }
            console.log(token);
            req.session.access_token = token;
            res.status(200).json({ success: true, token: token });
        }
    );
});

app.get('/getUser',isAuthenticated,function(req, res){
    console.log("access token")
    console.log(req.session.access_token)
   res.status(200).json(req.user)
})

  
app.post("/logout",(req, res)=>{
    console.log(req.session.id)
   store.destroy(req.session.id)
   req.session.destroy()
   req.session = null;
   return res.redirect("http://localhost:5173/")
})

app.listen(3000, () => {
    console.log("Listening on http://localhost:3000");
});
