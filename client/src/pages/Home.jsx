import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect} from "react";
import Product from "../components/Product";
import prodcut_details from "./../utils/product_details";
import Header from './../components/Header';
import Footer from "./../components/Footer"
import "../assets/styles/home.css";
import slider1 from "../assets/images/slider1.png";
import slider2 from "../assets/images/slider2.png";
import slider3 from "../assets/images/slider3.png";
import './../assets/styles/product.css';
import {useDispatch} from 'react-redux'
import { getUser } from "../store/modules/auth/actions";
const Home = () => {
	const dispatch = useDispatch()
	
	useEffect(() => {
		dispatch(getUser());
	},[dispatch]);

	return (
		<main>
			<Header />
			<div className="flex flex-col">
				<Carousel
					stopOnHover={false}
					autoPlay={true}
					interval={3000}
					infiniteLoop={true}
					className="-z-50 carousel h-[20%] w-[100%] flex flex-col items-center">
					<div>
						<img
							src={slider3}
							alt="Slider 3"
						/>
					</div>
					<div>
						<img
							src={slider2}
							alt="Slider 2"
						/>
					</div>
					<div>
						<img
							src={slider1}
							alt="Slider 1"
						/>
					</div>
				</Carousel>
				<div className="z-10 absolute top-[50%] md:top-[105%] border-t-4 border-t-white p-4 bg-white w-screen pb-[32%] md:pb-[16%] flex flex-col items-center">
					<div className="pl-72 whitespace-nowrap md:pl-5 font-bold font-montserrat text-[20px] md:text-[3rem] relative right-40">
						Successfully Serving for 10+ years
					</div>
				</div>
				<div className="courses">
					<div className="fon-bold font-montserrat text-xl pt-5">
						<h2 className="md:px-10  px-2 md:pb-2 pb-0 md:text-[2rem]">Explore products</h2>
					</div>
					<div className="">
						<div className="course-box-area py-1 md:py-10">
							<div className="cards">
								{prodcut_details.map((product) => (
										<Product
											key={product.id}
											product={product}/>
								))}
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</main>
	)
};

export default Home;
