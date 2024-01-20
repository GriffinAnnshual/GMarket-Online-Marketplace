/* eslint-disable react/prop-types */
import {useDispatch} from 'react-redux'
import {actions } from '../store/modules/cart/reducers'
const CartItems = (props) => {
    console.log("heelo")
    console.log(props)
    const dispatch = useDispatch()
    const { id, name, price, seller, img, sold, quantity } = props.itemDetails
    const handleIncrement = () =>{
        dispatch(
					actions.addItemToCart({
						id,
						name,
						price,
						seller,
						img,
						sold,
						quantity,
					})
				)
    }
    const handleDecrement = ()=>{
        dispatch(
					actions.removeItemFromCart({
						id,
						name,
						price,
						seller,
						img,
						sold,
						quantity,
					})
				)
    }
	return (
		<>
			<div className="flex justify-evenly gap-2 w-[100%] p-2">
				<div className="flex gap-4 items-center justify-center p-2">
					<div>
						<input
							type="checkbox"
							name="selector"></input>
					</div>
					<div className="p-0">
						<img
							src={img}
							className="h-[80%] w-[50%] object-contain "></img>
					</div>
					<div className="flex flex-col w-[60%]">
						<p className="text-lg">{name}</p>
						<p>Seller: {seller}</p>
						{!sold && "In Stock"}
						{sold && "Out of stock"}
						<p>Quantity: {quantity}</p>
					</div>
				</div>
				<div className="w-[20%] text-right flex items-center justify-center">
					<div className="flex gap-2 pr-[15%]">
						<button
							onClick={handleIncrement}
							className=" cursor-pointer rounded-md p-4 text-center flex justify-center items-center">
							+
						</button>
						<button
							onClick={handleDecrement}
							className="p-4 rounded-md text-center flex justify-center cursor-pointer items-center">
							-
						</button>
					</div>
					${price * quantity}
				</div>
			</div>
            <hr className='border-1 w-[90%] mx-auto border-black'></hr>
		</>
	)
}

export default CartItems
