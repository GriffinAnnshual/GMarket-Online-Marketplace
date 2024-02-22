import CartItems from "../components/CartItems"
import Header from "../components/Header"
import Product from "../components/Product"
import product_details from "../utils/product_details"
import {useSelector, useDispatch} from 'react-redux'
import { actions } from "../store/modules/cart/reducers"
import { paymentActions } from "../store/modules/payment/reducers"
import { Link } from "react-router-dom"
import { useState } from "react"
import {toast} from 'react-toastify'

const Cart = () => {
    const dispatch = useDispatch()
	const add = useSelector((state) => state.payment.address)

    const handleDeselectAll = () => {
        dispatch(actions.deselectAll());
    }
    const handleClearCart = () =>{
        dispatch(actions.clearCart());
    }
	const [isChecked, setIsChecked] = useState(false)
	const handleChecked = () => {
		setIsChecked(!isChecked)
	}
	const handleCheckout = () => {
		if(!isAuthenticated){
			toast.warning("Please login to order items")
			return null
		}
		if (!isChecked){
			toast.warning("Please confirm the selected items")
			return null
		}
		else{
			toast.info("Redirecting to Payments...")
			let {totalPrice, totalQuantity} = selectedInfo()
			if(totalQuantity === 0){
				toast.warning("Please select atleast one item!")
				return null
			}
			setTimeout(() => {
			dispatch(paymentActions.setPaymentTotalPrice(totalPrice))
			dispatch(
				paymentActions.setPaymentTotalQuantity(totalQuantity)
			)
			dispatch(
				paymentActions.setPaymentItemList(
					itemList.map((items) => {
						if (items.checked) return items
					})
				)
			)
			if (add) dispatch(paymentActions.setPaymentState("payment"))
			else dispatch(paymentActions.setPaymentState("address"))
			window.location.href = "/payment-form"
			}, 2000);
	}
}
    const itemList = useSelector((state) => state.cart.itemList)
    const totalPrice = useSelector((state) => state.cart.totalPrice)
    const totalQuantity = useSelector((state) => state.cart.totalQuantity)
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

	const selectedInfo = () =>{
		let totalPrice = 0
		let totalQuantity = 0
		itemList.map((item)=>{
			if(item.checked){
				totalPrice += item.price
				totalQuantity++
			}
			
		})
		return {totalPrice,totalQuantity}
	}

    return (
			<>
				<Header />
				<div className="w-screen p-4 flex ">
					<div className="w-[70%] bg-slate-300 h-[90%]">
						<div className="w-full flex justify-between h-[20%] p-2">
							<div className="flex flex-col">
								<div className="text-2xl">Shopping Cart</div>
								<div
									className=" text-blue-700 cursor-pointer"
									onClick={handleDeselectAll}>
									Deselect all items
								</div>
							</div>
							<div className="pt-8 pr-14 ">Price</div>
						</div>
						<hr className="border-black"></hr>
						<div className="w-full">
							{isAuthenticated ? (
								itemList.length === 0 ? (
									<div className="py-4 text-center">The cart is empty now.</div>
								) : (
									itemList.map((item) => (
										<CartItems
											type = "cart"
											key={item.id}
											itemDetails={item}
										/>
									))
								)
							) : (
								<div className="py-4 text-center">
									<Link to="/signup">
										<span className="cursor-pointer text-blue-700">Signup</span>
									</Link>{" "}
									to GMarket to Add Items
								</div>
							)}
						</div>
						<div className="flex justify-between items-center p-5">
							{itemList.length !== 0 ? (
								<div
									onClick={handleClearCart}
									className="py-1 text-center cursor-pointer w-[20%] bg-blue-600 rounded-xl shadow-sm shadow-blue-600 text-white border-2 border-black ml-2 whitespace-nowrap">
									Clear Cart
								</div>
							) : (
								""
							)}
							<p className="text-right p-4">
								Sub total:({totalQuantity} item): ₹{totalPrice}
							</p>
						</div>
					</div>
					<div className="w-[40%]">
						<div className=" bg-slate-300 p-2 mx-2">
							<p className=" text-xl ">
								Subtotal ({selectedInfo().totalQuantity} item): ₹
								{selectedInfo().totalPrice}
							</p>
							<input
								type="checkbox"
								checked={isChecked}
								onChange={handleChecked}
								name="confirm"></input>
							<p className="inline-block px-2">I confirm the selected items</p>
							<div className="p-4">
								<div
									onClick={handleCheckout}
									className="text-2xl text-center bg-blue-600 py-2 rounded-xl w-[100%] shadow-sm shadow-blue-600 text-white border-2 border-black cursor-pointer">
									{" "}
									Proceed to checkout
								</div>
							</div>
						</div>
						<div className="bg-slate-300 m-2 py-2 ">
							<p className="px-4 text-xl">More products you make like:</p>
							<div className="flex-wrap bottom-96">
								{product_details.map((product) => (
									<Product
										key={product.id}
										product={product}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</>
		)
}

export default Cart