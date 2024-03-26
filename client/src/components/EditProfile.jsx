import { FaLightbulb } from "react-icons/fa"
import { MdOutlineKeyboardArrowRight } from "react-icons/md"
import {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios'
import {toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

function EditProfile() {
	const user = useSelector((state) => state.auth.user)
	const [userData, setUserData] = useState({})
	const [formData, setformData] = useState({
		name: "",
		description: "",
		address: "",
		phone: "",
		email: "",
	})

    const handleVerifyMobile = () => {
        alert("Mobile number verified")
    }
    const handleEmailVerification = () => {
        alert("Email verified")
    }
	const handleChange = (e) =>{
		e.preventDefault()
		console.log(formData)
		setformData({...formData, [e.target.name]: e.target.value})
	}
	const handleSave = async()=>{
		const user_id = user.user_id
		await axios.post(`/api/v1/user/updateDetails/${user_id}`, {
			details: formData}, {
			headers: {
				"Content-Type": "application/json",
			},
		}).then(()=>{
			toast.success("Changes Saved Successfully!")
		}).catch(()=>{
			toast.warning("Error occured , Please try again later.")
		})
	}
	useEffect(()=>{
		const user_id = user.user_id
		const fetchUserData = async()=>{
			await axios.get(`/api/v1/user/details/${user_id}`,{
				withCredentials: true,
			}
			).then((res)=>{
				console.log("client", res.data.userDetails)
				setUserData(res.data.userDetails)
			})
		}
		fetchUserData();
	},[])
	return (
		<div className="w-[70%] border-2 border-black  m-8 rounded-md mr-10">
			<div className="p-4 font-bold">Edit Profile</div>
			<hr className="border-2 border-black"></hr>
			<div className="p-2 ">
				<p className="font-bold p-4">Basic Information</p>
				<div className="flex">
					<div className="flex-col p-4">
						<input
							name="name"
							type="text"
							placeholder="Name"
							value={!formData.name ? userData.name || "" : formData.name}
							onChange={handleChange}
							className="h-10 hover:bg-gray-200 hover:border-blue-500 hover:border-2 w-96 pl-2 rounded-md border-2 border-gray-500"></input>
						<textarea
							name="description"
							type="text"
							rows={7}
							onChange={handleChange}
							value={
								!formData.description
									? userData.description || ""
									: formData.description
							}
							placeholder="About me (optional)"
							className="p-2 hover:bg-gray-200 hover:border-blue-500 hover:border-2 w-60%  block my-10 h-20 w-96 pl-2 rounded-md border-2 border-gray-500"></textarea>
						<textarea
							name="address"
							value={
								!formData.address ? userData.address || "" : formData.address
							}
							type="text"
							rows={7}
							onChange={handleChange}
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
									name="phone"
									type="text"
									value={
										!formData.phone ? userData.phone || "" : formData.phone
									}
									placeholder="phone number"
									onChange={handleChange}
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
									name="email"
									type="text"
									placeholder="email"
									value={
										!formData.email ? userData.email || "" : formData.email
									}
									onChange={handleChange}
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
			{ (formData.name || formData.address || formData.description || formData.email || formData.phone)? (<div
				onClick={handleSave}
				className=" flex relative left-[70%] font-bold hover:text-white items-center h-10 whitespace-nowrap hover:bg-gray-700 m-5 px-4 rounded-md text-center w-fit border-2 border-black hover:border-none hover:shadow-md hover:shadow-black cursor-pointer ">
				Save changes
			</div>):
				(<div
					className=" flex relative left-[70%] font-bold items-center opacity-70 h-10 whitespace-nowrap m-5 px-4 rounded-md text-center w-fit border-2 border-black">
					Save changes
				</div>)
			}
		</div>
	)
}

export default EditProfile
