import { FaLightbulb } from "react-icons/fa"
import { MdOutlineKeyboardArrowRight } from "react-icons/md"

function EditProfile() {
    const handleVerifyMobile = () => {
        alert("Mobile number verified")
    }
    const handleEmailVerification = () => {
        alert("Email verified")
    }
	return (
		<div className="w-[70%] border-2 border-black  m-8 rounded-md mr-10">
			<div className="p-4 font-bold">Edit Profile</div>
			<hr className="border-2 border-black"></hr>
			<div className="p-2 ">
				<p className="font-bold p-4">Basic Information</p>
				<div className="flex">
					<div className="flex-col p-4">
						<input
							type="text"
							placeholder="Name"
							className="h-10 hover:bg-gray-200 hover:border-blue-500 hover:border-2 w-96 pl-2 rounded-md border-2 border-gray-500"></input>
						<textarea
							type="text"
							rows={7}
							placeholder="About me (optional)"
							className="p-2 hover:bg-gray-200 hover:border-blue-500 hover:border-2 w-60%  block my-10 h-20 w-96 pl-2 rounded-md border-2 border-gray-500"></textarea>
						<textarea
							type="text"
							rows={7}
							placeholder="Address (optional)"
							className="p-2 w-60% hover:bg-gray-200 hover:border-blue-500 hover:border-2  block my-10 h-20 w-96 pl-2 rounded-md border-2 border-gray-500"></textarea>
					</div>
					<div className="border-2 border-black w-fit h-36 p-2 mr-2">
						<div className="flex item gap-2 pb-2">
							<span>
								<FaLightbulb />
							</span>
							<b>Important</b>
						</div>
						<p className="text-sm">
							GMarket is built on trust. Help other people get to know you. Tell
							them about the things you like. Share your favorite brands, books,
							movies, shows, music, food. And you will see the results…
						</p>
					</div>
				</div>
			</div>
			<hr className="border-2 border-black"></hr>
			<div className="p-2 ">
				<p className="font-bold p-4">Contact Information</p>
				<div>
					<div className="flex items-center p-4">
						<div className="flex gap-10">
							<div className="border-2 border-gray-500 h-10 w-96 flex">
								<div className="p-1 text-gray-400">+91 </div>
								<div className=" h-[100%] border-black"></div>
								<input
									type="text"
									placeholder="phone number"
									className="pl-2 border-white border-none w-[80%] h-[100%]"></input>
								<div className=" h-[100%] border-2 border-gray-500"></div>
								<div onClick={handleVerifyMobile}>
									<MdOutlineKeyboardArrowRight size={35} />
								</div>
							</div>
							<div>Status: {"Verified"}</div>
						</div>
					</div>
					<div className="flex items-center p-4">
						<div className="flex gap-10">
							<div className="border-2 border-gray-500 h-10 w-96 flex">
								<div className=" h-[100%] border-black"></div>
								<input
									type="text"
									placeholder="email"
									className="pl-2 border-white border-none w-[90%] h-[100%]"></input>
								<div className=" h-[100%] border-2 border-gray-500"></div>
								<div onClick={handleEmailVerification}>
									<MdOutlineKeyboardArrowRight size={35} />
								</div>
							</div>
							<div>Status: {"Verified"}</div>
						</div>
					</div>
				</div>
			</div>
			<hr className="border-2 border-black"></hr>
			<div className=" flex relative left-[70%] font-bold hover:text-white items-center h-10 whitespace-nowrap hover:bg-gray-700 m-5 px-4 rounded-md text-center w-fit border-2 border-black hover:border-none hover:shadow-md hover:shadow-black cursor-pointer ">
				Save changes
			</div>
		</div>
	)
}

export default EditProfile
