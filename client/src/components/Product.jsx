/* eslint-disable react/prop-types */
import './../assets/styles/product.css'
const Product = (props) => {
	const { name, seller, rating, price, img } = props.product
	return (
		<div className="Restaurant-card bg-blue-500 font-bold text-[1.5rem]">
			<img
				className="object-contain"
				src={img}
				alt="briyani-pic"></img>
			<div className="details flex flex-col ">
				<div className="details-left">
					<p className="text-white text-[0.75rem] md:text-lg text-center">{name}</p>
					<p className="md:text-lg text-sm pl-4 text-blue-950"> Price: {price}</p>
				</div>
				<div className="details-right text-yellow-300 flex justify-between py-2">
					<p className="text-slate-900 md:text-sm text-[0.75rem]">{seller}</p>
					<p className="md:text-sm text-[0.65rem]"> Rating: {rating}</p>
				</div>
			</div>
		</div>
	)
}

export default Product