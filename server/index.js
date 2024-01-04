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

app.post("/login", async(req,res)=>{
    const {email, password} = req.body;
    console.log(req.body);

    const user = await User.findOne({ email: email});
    if (!user){
        console.log("User not found");
        res.sendStatus(401).json({ exists: false, message: 'User not found' });
    }
    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
        console.log("Incorrect password");
        res.sendStatus(401).json({ exists: false, message: 'Incorrect password' });
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
})



app.post('/register', async (req, res) => {

    const { email, password, username } = req.body;
    const user = await User.findOne({ email: email });

    if (user) {
        console.log("User already exists");
        res.sendStatus(401).json({ exists: true, message: 'User already exists' });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        email: email,
        name: username,
        password: hashPassword,
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
