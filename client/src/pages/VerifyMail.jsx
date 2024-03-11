import { useSelector, useDispatch } from "react-redux"
import { setEmailVerified } from "../store/modules/auth/actions"
import {Link} from 'react-router-dom'
import cartIcon from '../assets/images/shopping-cart.png'
import mailSend from '../assets/images/mail-send.png'
import { useState } from "react"
import OtpInput from "react-otp-input"
import axios from 'axios'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const VerifyMail = () => {
	const emailVerified = useSelector((state) => state.auth.emailVerified)
	console.log(emailVerified)
	const [otp, setOtp] = useState("")
	const dispatch = useDispatch();

    const handleVerification = () =>{
	axios
		.get(`/api/v1/mail/verify/email?verify=${otp}`, {
			withCredentials: true,
		})
		.then(() => {
			dispatch(setEmailVerified(true))
			toast.success("Email verified!")
			setInterval(()=>{window.open("http://localhost:5173/signup", "_self")},1000)
		})
		.catch((err) => {
				if (err.response.data.message) {
					toast.error(err.response.data.message)
				}
		})

  }
  return (
		<>
			<div className="bg-white h-screen flex justify-center">
				<div className="flex-col justify-center">
					<div className="bg-blue-500 h-[40%] w-screen">
						<div className=" items-center flex flex-row gap-4 py-2 px-4">
							<img
								src={cartIcon}
								className="w-[5%] md:w-[3%]"></img>
							<Link to="/">
								<h1 className="font-montserrat text-xl md:text-2xl font-bold text-[#1b3754]">
									G Market
								</h1>
							</Link>
						</div>
					</div>
					<div className="max-w-full flex justify-center h-[50%] pt-5">
						<div className="flex-col  pt-10 px-4 md:px-0">
							<p className="md:text-2xl text-xl text-center p-12 md:p-8 text-blue-500 font-bold">
								Enter - verification - code
							</p>
							<OtpInput
								inputStyle={{
									fontSize: "2rem",
									border: "1px solid",
									width: "2.5rem",
									height: "2.5rem",
									borderColor: "blue",
									color: "darkblue",
								}}
								value={otp}
								onChange={setOtp}
								numInputs={6}
								shouldAutoFocus={false}
								renderSeparator={<span className="p-2"></span>}
								renderInput={(props) => <input {...props} />}
							/>
							<div
								onClick={handleVerification}
								className="cursor-pointer w-full mt-10 h-10 items-center text-xl font-serif text-white rounded-md font-bold bg-blue-500 flex justify-center">
								{" "}
								Verify OTP!
							</div>
						</div>
					</div>
				</div>

				<div className="bg-white w-[90%] md:w-[40%] h-[35%] md:h-[46%] absolute top-32 md:top-10 mx-auto border-black border-2 ">
					<div className="w-max-full mx-auto flex justify-center ">
						<img
							className="w-32 md:w-28"
							src={mailSend}></img>
					</div>
					<div className="text-xl font-montserrat font-bold  flex justify-center">
						<p>OTP Sent!</p>
					</div>
					<div className="mx-auto w-[80%] pt-4">
						<p className="text-center text-sm">
							An OTP has been sent to your email inbox , please enter the OTP
							below or clik on the verification link sent to your mail, to
							verify your email.
						</p>
					</div>
					<a  href="/signup" className="flex justify-start text-sm p-2 text-blue-700">
						{"< Back to signup page"}
					</a>
				</div>
			</div>
			<ToastContainer />
		</>
	)
}

export default VerifyMail