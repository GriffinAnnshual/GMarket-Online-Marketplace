import Header from "../components/Header"
import Footer from "../components/Footer"
import PostListing from "../components/PostListing"
import {useSelector} from "react-redux"
import avatar from '../assets/images/avatar-profile.png'
import { FaCalendarAlt } from "react-icons/fa"
import { MdOutlineGroups2 } from "react-icons/md"
import { FaPhoneVolume } from "react-icons/fa6"
import { MdEmail } from "react-icons/md"
import { FaWhatsapp } from "react-icons/fa"
import { Link } from "react-router-dom"
import { TiEdit } from "react-icons/ti"

function Profile() {
    const user = useSelector((state)=> state.auth.user)
  return (
		<div className="w-screen h-screen">
			<Header />
			<div className="flex">
				<div className="w-[30%] text-gray-700 py-10">
					{" "}
					<div className="p-4 w-full mx-auto">
						<div className="w-fit">
							{user.picture ? (
								<img
									src={user.picture}
									className="w-32 border-2 border-black rounded-full"></img>
							) : (
								<img
									src={avatar}
									className="w-32"></img>
							)}
						</div>
					</div>
					<p className="px-8 font-bold text-lg">Griffin Annshual</p>
					<div className="px-8 py-4 text-sm">
						<div className="flex items-center gap-2">
							<FaCalendarAlt /> <span>Member since 1879</span>
						</div>
						<div className="flex items-center gap-2">
							<MdOutlineGroups2 /> 0 Followers | 0 Following
						</div>
						User verified with
						<div className="flex gap-2 mt-2">
							<FaPhoneVolume />
							<MdEmail />
							<FaWhatsapp />
						</div>
					</div>
					<Link to="/dashboard/editProfile">
						<div className="py-2 hover:bg-gray-700 hover:text-white font-bold text-center rounded-md my-4 border-2 border-black w-[60%] ml-8 cursor-pointer flex items-center justify-center ">
							<TiEdit />
							Edit Profile
						</div>
					</Link>
					<div className="text-gray-700 whitespace-nowrap font-bold mx-20 cursor-pointer">
						<u> Share Profile</u>
					</div>
				</div>
				<div className="w-[100%]">
					<PostListing />
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default Profile