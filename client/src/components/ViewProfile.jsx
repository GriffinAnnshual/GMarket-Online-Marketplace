import { RiDeleteBin5Line } from "react-icons/ri" 
import { useSelector } from "react-redux"
import avatar from '../assets/images/avatar-profile.png'

function ViewProfile() {
  const user = useSelector((state)=> state.auth.user)
	return (
		<div className="w-[70%] border-2 border-black  m-8 rounded-md mr-10 flex-col">
			<div className="p-4 font-bold">Profile Picture</div>
			<hr className="border-2 border-black"></hr>

			<div className="flex w-full">
				<div className="w-[50%]">
					<div className="p-4">
						<div className="cursor-pointer rounded-full hover:bg-blue-300 w-fit p-2">
							<RiDeleteBin5Line size={30} />
						</div>
						<div>
							{user.picture ? (
								<img
									src={user.picture}
									className="w-72 border-2 border-black rounded-full"></img>
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
					<div className=" flex mx-auto mt-20 font-bold hover:text-white items-center justify-center h-10 whitespace-nowrap hover:bg-gray-700 m-5 px-4 rounded-md  w-full text-lg   border-2 border-black hover:border-none hover:shadow-md hover:shadow-black cursor-pointer ">
						Upload a image
					</div>
				</div>
			</div>
		</div>
	)
}

export default ViewProfile
