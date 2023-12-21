/* eslint-disable react/prop-types */
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../action/productAction"
import { checkout } from "../action/productAction"
import { loadUser } from "../action/userAction"
import "../assets/styles/item.css"
import LoadingBar from "react-top-loading-bar"

const ItemCard = ({ item_name, description, image, itemId }) => {
	const { user } = useSelector((state) => state.user)

	const [progress, setProgress] = useState(0)

	const dispatch = useDispatch()

	const handleCart = async () => {
		setProgress(10)
		await dispatch(addToCart(itemId))
		setProgress(70)
		dispatch(loadUser())
		setProgress(100)
	}

	const handleCheckout = async () => {
		setProgress(10)
		await dispatch(checkout(itemId))
		setProgress(100)
	}

	const isAddedtoCart =
		user && user.cart && user.cart.some((item) => item._id === itemId)

	return (
		<>
			<LoadingBar
				color="#E29105"
				progress={progress}
				onLoaderFinished={() => setProgress(0)}
			/>
			<div className="course-box">
				<img src={image?.url} />
				<div className="course-content">
					<h3>{item_name}</h3>
					<p>{description?.overview}</p>
					<p>{description?.price}</p>
				</div>
				<div className="product_btn">
					<button onClick={handleCheckout}>Buy now</button>
					<button onClick={handleCart}>
						{isAddedtoCart ? "Remove from cart" : "Add to cart"}
					</button>
				</div>
			</div>
		</>
	)
}

export default ItemCard
