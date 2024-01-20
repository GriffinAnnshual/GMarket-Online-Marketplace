import CartItems from "../components/CartItems"
import Header from "../components/Header"
import Product from "../components/Product"
import product_details from "../utils/product_details"
import {useSelector, useDispatch} from 'react-redux'
import { actions } from "../store/modules/cart/reducers"
import { Link } from "react-router-dom"
const Cart = () => {
    const handleDeselectAll = () => {
        //deselects all the items in the cart
    }
    const dispatch = useDispatch()
    const handleClearCart = () =>{
        dispatch(actions.clearCart());
    }
    const itemList = useSelector((state) => state.cart.itemList)
    const totalPrice = useSelector((state) => state.cart.totalPrice)
    const totalQuantity = useSelector((state) => state.cart.totalQuantity)
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    console.log(isAuthenticated)
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
									className="py-1 text-center cursor-pointer w-[12%] bg-yellow-300 ml-2 whitespace-nowrap rounded-md shadow-sm shadow-black">
									Clear Cart
								</div>
							) : (
								""
							)}
							<p className="text-right p-4">
								Sub total:({totalQuantity} item): ${totalPrice}
							</p>
						</div>
					</div>
					<div className="w-[40%]">
						<div className=" bg-slate-300 p-2 mx-2">
							<p className=" text-xl ">
								Subtotal ({totalQuantity} item): ${totalPrice}
							</p>
							<input
								type="checkbox"
								name="confirm"></input>
							<p className="inline-block px-2">I confirm the selected items</p>
							<div className="p-4">
								<div className="text-2xl text-center bg-yellow-300 py-2 rounded-md w-[70%] shadow-sm shadow-black cursor-pointer">
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