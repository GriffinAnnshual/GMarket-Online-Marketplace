import bodyParser from 'body-parser';
import express from 'express';
import session from 'express-session'; 
import crypto from 'crypto';
import cors from 'cors'
import passport from './Middleware/auth.js'
import cookieParser from 'cookie-parser';
import isAuthenticated from './Middleware/userAuth.js';


const secretKey = crypto.randomBytes(32).toString("hex")
const app = express();
const allowedOrigins = [
	"http://localhost:3000",
	"http://localhost:5173",
	"https://accounts.google.com",
]
app.use(cookieParser())
app.use(
	cors({
		origin: function (origin, callback) {
			if (!origin) return callback(null, true)
			if (allowedOrigins.indexOf(origin) === -1) {
				var msg =
					"The CORS policy for this site does not allow access from the specified Origin."
				return callback(new Error(msg), false)
			}
			return callback(null, true)
		},
	})
)

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*")
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	)
	next()
})
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({ secret:secretKey,resave: true, saveUninitialized: true })); 


app.get(
	"/auth/google",
	passport.authenticate("google", { scope: ["email", "profile"] })

)


    app.get("/oauth2/redirect/google", function (req, res, next) {
        passport.authenticate("google", function (err, user, info) {
            if (err) {
                return next(err)
            }
            if (!user) {
                return res.redirect("/login")
            }
            console.log(info)
            res.cookie("access_token", info, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    expires: new Date(Date.now() + 60 * 60 * 1000),
                    sameSite: "strict",
            })
            return res.redirect("http://localhost:5173/")

        })(req, res, next)
    })



app.get('/home',isAuthenticated,function(req, res){
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
