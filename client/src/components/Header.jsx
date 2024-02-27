/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import searchIcon from "./../assets/images/search-icon.png"
import cartIcon from "../assets/images/shopping-cart.png"
import '../assets/styles/home.css'
import axios from 'axios'
import { FaRegUserCircle } from "react-icons/fa";
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import { logout } from "../store/modules/auth/actions"
import plus from '../assets/images/plus.png'

const  Header = () => {

	const dispatch = useDispatch()
	const isAuthenticated = useSelector((state)=> state.auth.isAuthenticated)
	const totalQuantity = useSelector((state)=> state.cart.totalQuantity)
	const user = useSelector((state)=> state.auth.user)
	const handleLogout = async () => {
		try {
			await axios.post(
				"http://localhost:3000/logout",
				{},
				{
					withCredentials: true,
					headers: {
						"Content-Type": "application/json",
					},
				}
			).then(()=>{
				dispatch(logout())
				toast.info("Logged out!")
				setInterval(()=>{window.location.reload()},1000)
				
			})
		} catch (err) {
			if (err.response.data.message) {
				toast.error(err.response.data.message)
			}
		}
	};

	return (
		<>
			<div className=" border-b-2 p-[5px] flex justify-center h-[10%] bg-slate-300 ">
				<div className=" items-center pb-2 justify-center flex flex-row gap-4 pt-5">
					<img
						src={cartIcon}
						className="md:w-[6%] animate-spin"></img>
					<Link to="/">
						<h1 className="font-montserrat md:text-3xl font-bold text-[#37404a]">
							G Market
						</h1>
					</Link>
				</div>
			</div>
			<div className="flex gap-[15%] md:gap-[4%] md:flex-row flex-col items-center p-[1%] md:pr-[1%]">
				<div className="p-2 flex max-w-full mx-auto md:mx-0 px-0 md:px-2 gap-2 md:gap-[5%] items-center md:w-[50%]">
					<Link to="/">
						<div className=" md:text-xl nav-box nav-left-box nav-box1 ">
							<h3>Marketplace</h3>
						</div>
					</Link>
					<div className="flex gap-2 items-center">
						<input
							type="text"
							className="w-60 md:w-96 md:h-10 h-8 px-2 border-2 rounded-md border-blue-600"
							placeholder="Search"
						/>
						<div>
							<img
								className="md:w-10 w-[80%] p-1 md:p-2 rounded-md border-2 border-blue-600"
								src={searchIcon}
								alt="search"
							/>
						</div>
					</div>
				</div>
				<div className="flex justify-evenly gap-2 md:gap-4 items-center md:text-xl md:py-0 py-2">
					<Link to="/bid">
						<div className="border-2 rounded-md border-blue-600 p-1 text-sm md:text-lg">
							<h3>AuctionPlace</h3>
						</div>
					</Link>
					<Link to="/cart">
						<div className="text-sm md:text-lg md:pr-10 mr-3 flex rounded-md items-center gap-2 border-2 border-blue-600 px-2 py-1 pr-8">
							<img
								className="w-[20px] md:w-[30px]"
								src={cartIcon}
								alt=""
							/>

							{!(totalQuantity === 0) && isAuthenticated && (
								<div className="relative right-2 bottom-2 text-white text-sm w-[30%] h-4 flex justify-center items-center rounded-full p-1 bg-red-600">
									{totalQuantity}
								</div>
							)}
							<p>cart</p>
						</div>
					</Link>
					<div className="md:p-2   p-0 text-sm md:text-lg">
						{isAuthenticated ? (
							<div className="text-sm drop-down ">
								<div className="primary-navigation">
									<ul>
										<li className="bg-slate-300 rounded-md">
											<div className="gap-2 font-serif  items-center md:pl-2 flex w-[100%]">
												<span>
													{user.picture ? (
														user.userName ? (
															<img
																className="md:w-max"
																src={user.picture}
																alt="profile_picture"></img>
														) : (
															<img
																className="w-[60px] rounded-full"
																src={user.picture}
																alt="profile_picture"></img>
														)
													) : (
														<FaRegUserCircle
															className="h-4 md:h-8"
															size={60}
														/>
													)}
												</span>{" "}
												<span className="text-[1rem]">
													{user.given_name || user.name}
												</span>
											</div>

											<ul className="dropdown text-lg px-10">
												<li>
													<a
														href="/dashboard/editProfile"
														className="ml-5">
														Dashboard
													</a>
												</li>
												<li>
													<a
														href="#"
														className="ml-5">
														Orders
													</a>
												</li>
												<li>
													<Link
														className="ml-5"
														onClick={handleLogout}>
														Logout
													</Link>
												</li>
											</ul>
										</li>
									</ul>
								</div>
							</div>
						) : (
							<Link to="/login">
								<div className="text-sm md:text-lg border-2 border-blue-600  rounded-md px-4 p-1">
									<h2>Signin</h2>
								</div>
							</Link>
						)}
					</div>
					<div>
						<a
							href="#_"
							className="relative inline-flex items-center justify-center px-10 py-[5px] overflow-hidden font-medium text-blue-700
							 transition duration-300 ease-out border-2 border-blue-700 rounded-md shadow-md group">
							<span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-700 group-hover:translate-x-0 ease">
								<img
									className="w-6 h-6"
									src={plus}
									alt=""
								/>
							</span>
							<span className="absolute flex items-center justify-center w-full h-full text-blue-700 transition-all duration-300 transform group-hover:translate-x-full ease">
								Sell
							</span>
							<span className="relative invisible">Sell</span>
						</a>
					</div>
				</div>
			</div>

			<nav className=" bg-slate-300 nav-belt-mini text-sm md:text-lg w-screen py-8 md:py-0 ">
				<div className=" gap-1 md:gap-2 nav-mini-left nav-mini-box">
					<span>
						<strong>List</strong>
					</span>
				</div>
				<div className="nav-mini-mid gap-0 md:gap-4">
					<div className=" nav-mini-mid-box2 nav-mini-mid-box">Sell</div>
					<div className="  nav-mini-mid-box3 nav-mini-mid-box">
						Best Sellers
					</div>
					<div className=" nav-mini-mid-box4 nav-mini-mid-box">Mobiles</div>
					<div className=" nav-mini-mid-box5 nav-mini-mid-box">
						{"Today's"} Deals
					</div>
					<div className="nav-mini-mid-box6 nav-mini-mid-box ">
						Customer Service
					</div>
					<div className="nav-mini-mid-box7 nav-mini-mid-box">New Releases</div>
					<div className="nav-mini-mid-box8 nav-mini-mid-box">Electronics</div>
					<div className="nav-mini-mid-box9 nav-mini-mid-box dropdown-icon">
						Hot &#9662;
					</div>
				</div>
			</nav>
		</>
	)
}

export default Header
