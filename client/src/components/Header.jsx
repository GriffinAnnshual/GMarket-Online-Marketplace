import { Link } from "react-router-dom"
import searchIcon from "./../assets/images/search-icon.png"
import cartIcon from "../assets/images/shopping-cart.png"
import '../assets/styles/home.css'

function Header() {
const isAuthenticated = true;
	return (
		<>
			<div className=" border-b-2 p-[5px] flex justify-center h-[10%] bg-slate-300 ">
				<div className="flex flex-row gap-4 pl-[25%] pt-5">
					<img
						src={cartIcon}
						className="w-[8%]"></img>
					<Link to="/">
						<h1 className="font-montserrat font-bold text-[#37404a]">
							G Market
						</h1>
					</Link>
				</div>
			</div>
			<div className="flex justify-between  items-center p-[1%]">
				<div className="flex px-5 gap-[5%] items-center">
					<Link to="/">
						<div className=" text-2xl nav-box nav-left-box nav-box1 ">
							<h2>Marketplace</h2>
						</div>
					</Link>
					<div className="flex gap-2 items-center">
						<input
							type="text"
							className="w-[900px] h-12 px-5 border-4 rounded-md border-blue-600"
							placeholder="Search"
						/>
						<div className="">
							<img
								className="w-[10%] p-2  rounded-md m-2 border-2 border-blue-600"
								src={searchIcon}
								alt="search"
							/>
						</div>
					</div>
				</div>
				<div className="flex gap-4 items-center w-[100%] text-2xl ">
					<Link to="/bid">
						<div className="nav-box nav-right-box nav-box9 border-2 border-blue-600 p-2">
							<h3>AuctionPlace</h3>
						</div>
					</Link>
					<div className="nav-box nav-right-box nav-box7 ">
						{isAuthenticated ? (
							<Link to="/dashboard">Dashboard</Link>
						) : (
							<div className="border-2 border-blue-600 p-2">
								<Link to="/login">
									<p>SignIn</p>
								</Link>
							</div>
						)}
					</div>
					<Link to="/cart">
						<div className="flex items-center gap-2 nav-box nav-right-box nav-box9 border-2 border-blue-600 px-2 py-1">
							{/* <div className="cart_number">{user?.cart.length}</div> */}
							<img
								className="w-[40px]"
								src={cartIcon}
								alt=""
							/>
							<p>cart</p>
						</div>
					</Link>
				</div>
			</div>

			<nav className=" bg-slate-300 nav-belt-mini text-xl ">
				<div className="gap-2 text-xl nav-mini-left nav-mini-box">
					<div className="burger">
						<div className="line"></div>
						<div className="line"></div>
						<div className="line"></div>
					</div>
					<span>
						<strong>List</strong>
					</span>
				</div>
				<div className="nav-mini-mid gap-4 text-xl">
					<div className="text-xl nav-mini-mid-box2 nav-mini-mid-box">Sell</div>
					<div className=" text-xl nav-mini-mid-box3 nav-mini-mid-box">
						Best Sellers
					</div>
					<div className=" text-xl nav-mini-mid-box4 nav-mini-mid-box">
						Mobiles
					</div>
					<div className=" text-xl nav-mini-mid-box5 nav-mini-mid-box">
						{"Today's"} Deals
					</div>
					<div className="nav-mini-mid-box6 nav-mini-mid-box">
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
