/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

function Sidebar() {
  return (  
		<div className="p-5 pl-20  w-[30%] flex-col column-gap-4">
			<Link to="/dashboard/editProfile">
				<div className=" text-left my-4 cursor-pointer">Edit Profile</div>
			</Link>
			<Link to="/dashboard/profile-picture">
				<div className="text-left my-4 cursor-pointer">Profile Picture</div>
			</Link>

			<Link to="/profile">
				<div className="py-2 hover:bg-gray-700 hover:text-white font-bold text-center rounded-md my-4 border-2 border-black w-full cursor-pointer ">
					View Profile
				</div>
			</Link>
		</div>
	)
}

export default Sidebar