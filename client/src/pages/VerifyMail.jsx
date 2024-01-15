import { useSelector, useDispatch } from "react-redux"
import {setEmailVerified} from "../store/reducers/userReducer"
import {Link} from 'react-router-dom'
import cartIcon from '../assets/images/shopping-cart.png'
import mailSend from '../assets/images/mail-send.png'
import { useState } from "react"
import OtpInput from "react-otp-input"
import axios from 'axios'

const VerifyMail = () => {
	const emailVerified = useSelector((state) => state.user.emailVerified)
	console.log(emailVerified)
	const [otp, setOtp] = useState("")
	const dispatch = useDispatch();

    const handleVerification = () =>{
	axios
		.get(`http://localhost:3000/verify/email?verify=${otp}`, {
			withCredentials: true,
			headers: {
				"Content-Type": "application/json",
			},
		})
		.then((res) => {
			// dispatch(setEmailVerified(true))
			window.location.href = "/signup"
			console.log(res.data)
		})
		.catch((err) => {
			console.log(err)
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
						<div className="flex-col  pt-16">
							<p className="text-2xl text-center p-8 text-blue-500 font-bold">Enter - verification - code</p>
							<OtpInput
								inputStyle={{
									fontSize: "2rem",
									border: "1px solid",
									width: "4rem",
									height: "4rem",
									borderColor: "blue",
									color: "darkblue"
								}}
								value={otp}
								onChange={setOtp}
								numInputs={6}
								shouldAutoFocus={false}
								renderSeparator={<span className="p-2"></span>}
								renderInput={(props) => <input {...props} />}
							/>
							<div onClick={handleVerification} className="w-full mt-10 h-10 items-center text-xl font-serif text-white rounded-md font-bold bg-blue-500 flex justify-center"> Verify OTP!</div>
						</div>
					</div>
				</div>

				<div className="bg-white w-[90%] md:w-[40%] h-[45%] absolute top-32 md:top-10 mx-auto border-black border-2 ">
					<div className="w-max-full mx-auto flex justify-center ">
						<img
							className="w-32 md:w-40"
							src={mailSend}></img>
					</div>
					<div className="text-2xl font-montserrat font-bold  flex justify-center">
						<p>OTP Sent!</p>
					</div>
					<div className="mx-auto w-[80%] pt-4">
						<p className="text-center text-lg">
							An OTP has been sent to your email inbox , please enter the OTP
							below or clik on the verification link sent to your mail, to
							verify your email.
						</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default VerifyMail