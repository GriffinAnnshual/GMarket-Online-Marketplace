import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
// import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Product from "../components/Product"
import prodcut_details from "./../utils/product_details"
import Header from './../components/Header'
import "../assets/styles/home.css"
import slider1 from "../assets/images/slider1.png"
import slider2 from "../assets/images/slider2.png"
import slider3 from "../assets/images/slider3.png"
import './../assets/styles/product.css'
const Home = () => {

	return (
		<main>
			<Header />
			<div className="flex flex-col">
				<Carousel
					stopOnHover={false}
					autoPlay={true}
					interval={3000}
					infiniteLoop={true}
					className="carousel h-[20%] w-[100%] flex flex-col items-center">
					<div>
						<img src={slider3} />
					</div>
					<div>
						<img src={slider2} />
					</div>
					<div>
						<img src={slider1} />
					</div>
				</Carousel>
				<div className="">
					<p className=" pl-10 font-bold font-montserrat text-[5rem]">
						Successfully Serving for 10+ years
					</p>
				</div>
			</div>

			<div className="courses">
				<div className="fon-bold font-montserrat text-2xl">
					<h2 className="px-10 pt-20 pb-5 text-[3rem]">Explore products</h2>
					<span className="pl-10">See more</span>
				</div>
				<div className="">
					<div className="course-box-area  py-10">
						<div className="cards">
							{prodcut_details.map((products) => (
								<Link
									to={`/product/${products.id}`}
									key={products.id}>
									<Product
										key={products.id}
										product={products}
									/>
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}

export default Home
