import { RiDeleteBin5Line } from "react-icons/ri" 
import { useSelector } from "react-redux"
import avatar from '../assets/images/avatar-profile.png'
import {useRef} from 'react'
import {toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios'
import {useEffect , useState} from 'react'

function ViewProfile() {
  const [image, setImage] = useState(null)
  const [userData, setUserData] = useState({})
  const user_id = useSelector((state)=> state.auth.user).user_id
  const inputRef = useRef(null);

	useEffect(() => {
		const user_id = user.user_id
		const fetchUserData = async () => {
			await axios
				.get(`/api/v1/user/details/${user_id}`, {
					withCredentials: true,
				})
				.then((res) => {
					console.log("client", res.data.userDetails)
					setUserData(res.data.userDetails)
				})
		}
		fetchUserData()
	}, [])

  const handleUpload = async(e) =>{
	const file = e.target.files[0];
	if (file){
		const formData = new FormData()
		formData.append('image', file)
		await axios.post(
			`/api/v1/user/uploadAvatar/${user_id}`,
			formData,
			{
				withCredentials: true,
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		)
		.then((res)=>{
			setImage(res.data.image_url)
			toast.success("File uploaded successfully")
		})
		.catch(()=>{
			toast.error("Failed to upload file")
		})
	}else{
		toast.warning("File not Selected")
	}
  }
  const handleRemove = async() => {
	await axios.get(`/api/v1/user/removeAvatar/${user_id}`,{
		withCredentials: true,
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then((res)=>{
		setUserData(null)
		setImage(null)
		toast.success(res.data.message)
	})
	.catch((err) => {
		toast.warning(err)
	})
  }


  const handleSelectFile = () =>{
	inputRef.current.click()
  }
  const user = useSelector((state)=> state.auth.user)
	return (
		<div className="w-[70%] border-2 border-black  m-8 rounded-md mr-10 flex-col">
			<div className="p-4 font-bold">Profile Picture</div>
			<hr className="border-2 border-black"></hr>

			<div className="flex w-full">
				<div className="w-[50%]">
					<div className="p-4">
						<div onClick={handleRemove} className="cursor-pointer rounded-full hover:bg-blue-300 w-fit p-2">
							<RiDeleteBin5Line size={30} />
						</div>
						<div>
							{(image || userData?.profilePic || false )? (
								<img
									src={image || userData.profilePic}
									className="w-60 border-2 border-black rounded-full"></img>
							) : (
								<img
									src={avatar}
									className="w-72"></img>
							)}
						</div>
					</div>
				</div>
				<div className="text-sm w-[50%] p-4 flex-col ">
					Clear photos are an important way for buyers and sellers to learn
					about each other. Be sure doesn’t include any personal or sensitive
					info you’d rather not have others see.
					<p className="mt-4">
						<b>It’s not much fun to chat with a landscape!</b>
					</p>
					<input
						type="file"
						onChange={handleUpload}
						ref={inputRef}
						style={{ display: "none" }}
					/>
					<div
						onClick={handleSelectFile}
						className=" flex mx-auto mt-20 font-bold hover:text-white items-center justify-center h-10 whitespace-nowrap hover:bg-gray-700 m-5 px-4 rounded-md  w-full text-lg   border-2 border-black hover:border-none hover:shadow-md hover:shadow-black cursor-pointer ">
						Upload a Avatar
					</div>
				</div>
			</div>
		</div>
	)
}

export default ViewProfile
