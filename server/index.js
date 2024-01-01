import bodyParser from 'body-parser';
import express from 'express';
import session from 'express-session'; 
import crypto from 'crypto';
import cors from 'cors'
import passport from './Middleware/auth.js'
import cookieParser from 'cookie-parser';
import isAuthenticated from './Middleware/userAuth.js';
import mongoose from 'mongoose'
import MongoDBStore  from 'connect-mongodb-session';
import dotenv from 'dotenv'
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

app.get(
	"/auth/google",
	passport.authenticate("google", { scope: ["email", "profile"] })

)


app.get("/oauth2/redirect/google", function (req, res, next) {
    passport.authenticate("google", function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect("/login")
        }
        return res.redirect("http://localhost:5173/")
    })(req, res, next)  
})

app.get('/home',function(req, res){
    req.session.isAuth = true;
    console.log(req.session);
    console.log(req.session.cookie);
    res.status(200).json({success:true, message:"You are authenticated"})
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
