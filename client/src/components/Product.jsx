/* eslint-disable react/prop-types */
import './../assets/styles/product.css'
import {useSelector ,useDispatch} from 'react-redux'
import { actions } from '../store/modules/cart/reducers'
import {toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

const Product = (props) => {
	const dispatch = useDispatch()
	const isAuthenticated = useSelector(state=>state.auth.isAuthenticated)
	const { id, name, seller, rating, price, img , category, sold} = props.product

	const handleAddToCart = () => {
		if(!isAuthenticated){
			toast.warning("Please login to add to cart")
			setInterval(()=>{return null},1000)
		}else{
		dispatch(
			actions.addItemToCart({
				id: id,
				category: category,
				name: name,
				seller: seller,
				rating: rating,
				price: price,
				quantity: 1,
				img: img,
				sold: sold,
			})
		)
		toast.success("Item added to Cart")
		}

	}
	const handleClickProduct = () => {
		window.open(`/product/${id}`,"_self")
	}
	return (
		<div className="Restaurant-card bg-blue-500 font-bold text-[1.5rem]">
			<img
				className="object-contain cursor-pointer"
				onClick={handleClickProduct}
				src={img}
				alt={name}></img>
			<div className="details flex flex-col ">
				<div className="details-left">
					<p className="text-white text-[0.75rem] md:text-lg text-center">
						{name}
					</p>
					<p className="md:text-lg text-sm pl-4 text-blue-950">
						{" "}
						Price: {price}
					</p>
				</div>
				<div className="details-right text-yellow-300 flex justify-between pt-1">
					<div>
						<div
							className="p-1 md:mt-1 w-[100%] md:w-[120%] shadow-lg shadow-transparent cursor-pointer text-center h-[50%] md:h-[70%] font-mono flex items-center justify-center text-[0.65rem] md:text-sm rounded-md bg-yellow-400 text-black whitespace-nowrap"
							onClick={handleAddToCart}>
							Add to cart
						</div>
					</div>
					<div className="flex flex-col">
						<p className="text-slate-900 md:text-sm text-[0.65rem]">
							Seller : {seller}
						</p>
						<p className="md:text-sm text-[0.65rem]"> Rating: {rating}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Product