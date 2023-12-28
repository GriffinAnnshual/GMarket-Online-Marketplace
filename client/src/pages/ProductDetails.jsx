import prodcut_details from '../utils/product_details'
import Header from './../components/Header'
import { Link, useParams } from "react-router-dom"
function ProductDetails() {
    const { id } = useParams()
    const {name,category,seller,rating,price,img} = prodcut_details[id];
  return (
		<>
			<Header />
			<div className="w-screen flex ">
				<div>
					<img
						className="object-contain w-[700px] h-[700px] rounded-md p-10"
						src={img}></img>
				</div>
				<div className="flex flex-col gap-4 p-10">
					<div className="p-5 flex flex-col gap-4 w-[700px] h-[200px] border-2 border-black">
						<h2 className="text-6xl ">{price}</h2>
						<h3 className="text-2xl">{name}</h3>
						<h3 className="text-2xl">Category: {category}</h3>
						<div className="flex justify-between"></div>
					</div>
					<div className=" p-5 w-[700px] h-[200px] border-2 border-black">
						<div className="font-bold text-4xl">Seller Description</div>
						<div className="flex gap-14 items-center py-5">
							<img
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRGDi52dStueKWXX9_XhblTTP9nXConHYkgg&usqp=CAU"
								className="w-10"></img>
							<div> Mr.{seller} </div>
						</div>
						<div className=" items-center text-white hover:text-white text-3xl flex justify-center h-12 bg-blue-500">
							<Link
								className="text-white"
								to={`/chat/${id}`}>
								<p className="text-white-900">Chat with Seller</p>
							</Link>
						</div>
					</div>
					<div className="p-10 gap-8 text-2xl flex flex-col w-[700px] h-[200px] border-2 border-black">
						<div className="flex gap-4 items-center">
							<b>Seller rating:</b> {rating}/5{" "}
							<img
								src="https://img.freepik.com/premium-vector/gold-star-brilliant-award_759710-30.jpg"
								className="w-10"></img>
						</div>
						<div>
							<b>Contact:</b> <a href="">{seller}@gmarket.gmail.com</a> for more
							details.
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ProductDetails