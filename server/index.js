import bodyParser from 'body-parser';
import express from 'express';
import session from 'express-session'; 
import crypto from 'crypto';
import bcrypt from 'bcryptjs';  
import passport from './Middleware/auth.js'
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose'
import MongoDBStore  from 'connect-mongodb-session';
import dotenv from 'dotenv'
import isAuthenticated from './Middleware/userAuth.js';
import cors from 'cors'
dotenv.config()


const allowedOrigins = [
	"http://localhost:3000",
	"http://localhost:5173",
	"https://accounts.google.com",
]
const secretKey = crypto.randomBytes(32).toString("hex")

// Create a express app.
const app = express();
// Cookie parser help to access the cookie values of the browser inside a server.
app.use(cookieParser())
// Body parser help to access the body values of the browser inside a server.
app.use(bodyParser.urlencoded({ extended: true }));

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


app.get('/register',async (req,res)=>{
    const {username,password,email} = req.body;

    const user = await User.findOne({email: email});

    if(user){
        res.send(401).json({exists: true, message: 'User already exists'});
    }
    const hashPassword = bcrypt.hash(password, 10);

    const User = new User({
        name: username,
        password: hashPassword,
        email: email
    })

    await User.save()

    jwt.sign(User, "secretKey", {expiresIn: '24h'}, (err, token)=>{
        res.cookie('access_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.status(200).json({success: true, token: token})
    })


    return res.redirect("/home")
})

app.get('/getUser',isAuthenticated,function(req, res){
    console.log(req.user)
   res.status(200).json(req.user)
})
  
app.post("/logout", function (req, res, next) {
    res.clearCookie('access_token', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.clearCookie('refresh_token', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.status(200).json({ message: 'Logout successful' });
    res.redirect("http://localhost:5173/")
})

app.listen(3000, () => {
    console.log("Listening on http://localhost:3000");
});
