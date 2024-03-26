/* eslint-disable react/prop-types */
import { useState } from "react"
import { Link} from "react-router-dom"
import { FcGoogle } from "react-icons/fc";
import { BsTwitterX } from "react-icons/bs"
import axios from 'axios'
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import cartIcon from "../assets/images/shopping-cart.png"
import { useNavigate } from "react-router-dom"
import Cookies from "universal-cookie"


const Login = () => {
	const cookie = new Cookies(null, {
		path: "/",
		maxAge: 24 * 60 * 60, 
	})
	const navigate = useNavigate()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const handleLogin = async (e) => {
		e.preventDefault()

		await axios.post("/api/v1/user/login",{email: email, password: password},{
			withCredentials: true,
			headers: {
				"Content-Type": "application/json",
			}
		}).then((res)=>{
			const token = res.data.token
			cookie.set('gmarket_user_token', token)
			cookie.set('loginType','jwt')
			toast.success("Login successful")
			setInterval(()=>{
				navigate("/")
			},1000)
		})
		.catch((err)=>{
			if(err.response.data){
				toast.error(err.response.data.message)
			}
		})
	}	

	const handleGoogle = async() => {
		toast.info("Redirecting to Google")
		window.open("http://localhost:3000/api/v1/auth/google", "_self")
	}

	const handleTwitter = async() =>{
			toast.info("Redirecting to Twitter")
			window.open("http://localhost:3000/api/v1/auth/twitter", "_self" )
	}

	return (
		<div className="font-sans h-[100vh] flex justify-center items-center bg-blue-600">
			<div className="absolute  md:right-[80%] top-0  items-center pb-2 justify-center flex flex-row gap-4 pt-5">
				<img
					src={cartIcon}
					className="w-[8%] md:w-[15%]"></img>
				<Link to="/">
					<h1 className="font-montserrat text-2xl md:text-3xl font-bold text-[#37404a]">
						G Market
					</h1>
				</Link>
			</div>
			<div className="bg-white flex-col border h-[80%] md:w-[30%] w-[90%] p-5 border-solid border-[rgb(231,231,231)] flex justify-center items-center">
				<h2 className="text-2xl mt-12 mb-4 font-mono text-blue-700">
					Welcome to GMarket
				</h2>
				<form
					className="rounded-md gap-2 text-base flex-col border-b-neutral-300 w-4/5 px-2.5 py-5 border-b border-solid flex justify-center items-center"
					onSubmit={handleLogin}>
					<input
						className="w-[100%] m-[5px] p-2.5 bg-slate-200"
						type="email"
						placeholder="Enter you email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>

					<input
						className="w-[100%] m-[5px] p-2.5 bg-slate-200"
						type="password"
						placeholder="Enter you password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<div className="flex w-full justify-center gap-2 pt-4 pb-2">
						<input
							className="text-xl bg-blue-600 text-[white] cursor-pointer font-mono rounded-md py-1 w-full "
							type="submit"
							id=""
							value="Login"
						/>
					</div>
					<p className="text-base">
						{"Didn't"} have account?{" "}
						<Link to="/signup">
							<span className="text-blue-700">Signup</span>
						</Link>
					</p>
				</form>
				<div className="gap-2 flex rounded-none flex-col py-4 mb-8  whitespace-nowrap justify-center items-center">
					<div
						className=" cursor-pointer bg-slate-200 flex place-items-center rounded-md border-2 border-blue-800 p-1 px-3 gap-2 text-right"
						onClick={handleGoogle}>
						<FcGoogle />
						{"Login with Google"}
					</div>
					<div
						className=" cursor-pointer bg-slate-200 border-2 rounded-md	 flex place-items-center border-blue-800 p-1 px-4 text-right gap-2"
						onClick={handleTwitter}>
						<BsTwitterX />
						{"Login with twitter"}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
