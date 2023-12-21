/* eslint-disable react/prop-types */
import './../assets/styles/product.css'
const Product = (props) => {
	const { name, seller, rating, price, img } = props.product
	return (
		<div className="Restaurant-card bg-blue-500 font-bold text-[1.5rem]">
			<img className='object-contain'
				src={img}
				alt="briyani-pic"></img>
			<div className="details">
				<div className="details-left">
					<h2 className='text-white'>{name}</h2>
					<h3 className='text-slate-900'>{seller}</h3>
				</div>
				<div className="details-right text-yellow-300">
					<h3> Rating:{" "}{rating}</h3>
					<h3> Price: {price}</h3>
				</div>
			</div>
		</div>
	)
}

export default Product