import express from "express"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import cors from "cors"
import MongoDBStore from "connect-mongodb-session"
import session from "express-session"
import crypto from "crypto"
import { config } from "dotenv"
import userRouter from './Routes/api/user/userRouter.js'
import authRouter from "./Routes/api/auth/authRouter.js"
import mailRouter from "./Routes/api/mail/mailRouter.js"
// import orderRouter from "./Routes/api/order/orderRouter"
import paymentRouter from "./Routes/api/payment/paymentRouter.js"
config({
	path: "./.env",
})


const app = express()
// Cookie parser help to access the cookie values of the browser inside a server.
app.use(cookieParser())
app.use(express.json())
// Body parser help to access the body values of the browser inside a server.
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

const secretKey = crypto.randomBytes(32).toString("hex")
const MongoDBSession = MongoDBStore(session)
const store = new MongoDBSession({
	uri: process.env.MONGO_URI,
	collection: "MySessions",
})

app.use(
	session({
		secret: secretKey,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 3600000,
		},
		
		store: store,
	})
)


app.use("/api/v1/user", userRouter)
app.use("/api/v1/mail", mailRouter)
// app.use("/api/v1/order", orderRouter)
app.use("/api/v1/payment", paymentRouter)
app.use("/api/v1/auth", authRouter)




app.get("/", (req, res) => {
	res.send("The Server is working fine.")
})


export {app, store}