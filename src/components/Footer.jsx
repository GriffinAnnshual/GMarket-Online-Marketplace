import shopping_cart from '../assets/images/shopping-cart.png'

const Footer = () => {
	return (
		<footer className="">
			<div className="h-20 md:py-20 flex justify-between p-2 md:p-10 items-center bg-slate-300">
				<div className=" flex items-center gap-2 text-black-600">
					<img
						className="md:w-20 w-10"
						src={shopping_cart}
					/>
					<a href="/">
						<div className="font-montserrat font-bold text-xl md:text-[3rem]">GMarket</div>
					</a>
				</div>
				<div className="text-sm flex gap-4 md:gap-10 md:text-2xl">
					<div>Home</div>
					<div>Offer</div>
					<div>About</div>
					<div>Contact</div>
				</div>
			</div>
			<div className="">
				<a href="#">
					<i className="fab fa-facebook"></i>
				</a>
				<a href="#">
					<i className=""></i>
				</a>
				<a href="#">
					<i className=""></i>
				</a>
			</div>
		</footer>
	)
}

export default Footer
