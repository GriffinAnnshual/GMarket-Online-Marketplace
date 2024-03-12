/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import cartIcon from '../assets/images/shopping-cart.png';
import Footer from '../components/Footer';
import {useSelector, useDispatch} from 'react-redux'
import SelectPayment from '../components/SelectPayment';
import {useState } from 'react';
import {paymentActions} from '../store/modules/payment/reducers'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function CheckoutForm() {
	const dispatch =  useDispatch();
    const totalPrice = useSelector((state) => state.payment.totalPrice)
	const totalQuantity = useSelector((state) => state.payment.totalQuantity)
	const paymentState = useSelector((state) => state.payment.currentState)
	console.log(totalPrice, totalQuantity, paymentState)

	const [address, setAddress] = useState({
		name: "",
		email: "",
		address: "",
		city: "",
		state: "",
		pincode: "",
	})


	const handleForm = (e) => {
		console.log(address)
		e.preventDefault()
		if(paymentState === "payment"){
			console.log("hi")
		}
		else if (paymentState === "address") {
			setAddress({...address, [e.target.name]: e.target.value})
		}
		else{
			console.log("hi")

		}
	}
	const handleAddressSubmit = () => {
		toast.success("Addressed saved successfully!")
	setTimeout(() => {
		dispatch(paymentActions.setPaymentState("payment"))
		dispatch(paymentActions.setPaymentAddress(address))
	}, 2000);
	}

  return (
		<div>
			<div className="  items-center pb-2 justify-start pl-4 flex flex-row w-screen bg-slate-300 py-4">
				<Link
					to="/"
					className="flex gap-2 z-10 w-[20%]">
					<img
						src={cartIcon}
						className="md:w-[15%] animate-spin"></img>
					<h1 className="font-montserrat md:text-3xl font-bold text-[#37404a]">
						G Market
					</h1>
				</Link>
				<div className="w-full text-center absolute text-2xl pr-4">
					Checkout
				</div>
				<div className="w-fit left-[90%] absolute text-2xl pr-4">
					<img
						className="w-4"
						src="https://m.media-amazon.com/images/G/31/x-locale/checkout/truespc/secured-ssl._CB485936980_.png"
						alt=""
					/>
				</div>
			</div>
			<div className="w-screen pl-10 flex pb-10">
				{paymentState === "payment" && <SelectPayment />}
				{paymentState !== "payment" && (
					<div className="w-[70%] py-5 ">
						<p className="text-blue-900 font-sans font-bold py-2 text-lg pb-4">
							1. Enter a new shipping address
						</p>
						<div className=" mb-10 border-blue rounded-md  shadow-blue-600 shadow border-2 bg-slate-300">
							<div>
								<div className="flex flex-col p-4 px-8">
									<div className="text-xl text-blue-900 font-bold font pb-10 pl-2 w-full text-center ">
										Add a new address
									</div>
									<div className="w-[90%] flex flex-col gap-4">
										<input
											className="w-full border-2 mb-2 border-blue-200 bg-white rounded-md h-8 px-2"
											name="name"
											type="text"
											placeholder="Name"
											value={address.name}
											onChange={handleForm}
											required
										/>
										<input
											className="w-full border-2 mb-2 border-blue-200 bg-white rounded-md h-8 px-2"
											name="email"
											type="text"
											placeholder="Email"
											value={address.email}
											onChange={handleForm}
											required
										/>
										<input
											className="w-full border-2 mb-2 border-blue-200 bg-white rounded-md h-8 px-2"
											name="address"
											type="text"
											placeholder="Address"
											value={address.address}
											onChange={handleForm}
											required
										/>
										<input
											className="w-full border-2 mb-2 border-blue-200 bg-white rounded-md h-8 px-2"
											name="city"
											type="text"
											placeholder="City"
											value={address.city}
											onChange={handleForm}
											required
										/>
										<input
											className="w-full border-2 mb-2 border-blue-200 bg-white rounded-md h-8 px-2"
											name="state"
											type="text"
											placeholder="State"
											value={address.state}
											onChange={handleForm}
											required
										/>
										<input
											className="w-full border-2 mb-2 border-blue-200 bg-white rounded-md h-8 px-2"
											name="pincode"
											type="text"
											placeholder="Pincode"
											value={address.pincode}
											onChange={handleForm}
											required
										/>
									</div>
									<hr className="mt-10 mb-2 w-full h-2 border-black" />
									<p className="pl-2">2 Payment Method</p>
									<hr className="my-4  w-full h-2 border-black" />
									<p className="pl-2">3 Items and Delivery</p>
								</div>
							</div>
						</div>
						<div>
							<div className="text-[0.7rem] py-4">
								Need help? Check our{" "}
								<span className="text-blue-700">help pages or contact us</span>
							</div>
							<div className="text-[0.7rem] text-justify pb-8">
								{`When your order is placed, we'll send you an e-mail message
						acknowledging receipt of your order. If you choose to pay using an
						electronic payment method (credit card, debit card or net banking),
						you will be directed to your bank's website to complete your
						payment. Your contract to purchase an item will not be complete
						until we receive your electronic payment and dispatch your item. If
						you choose to pay using Pay on Delivery (POD), you can pay using
						cash/card/net banking when you receive your item.`}
							</div>
						</div>
					</div>
				)}
				<div className="w-[40%] py-8 mx-2 md:pt-[2%] ">
					<div className=" bg-slate-300 p-2 mx-4 rounded-md shadow-blue-600 shadow border-2">
						<div className="p-4">
							{paymentState === "address" && (
								<div
									onClick={handleAddressSubmit}
									className="text-xl mb-4 mx-auto text-center bg-blue-500 py-2 rounded-xl w-[100%] shadow-sm font text-white shadow-blue-600 animate-pulse drop-shadow-xl cursor-pointer">
									Use This Address
								</div>
							)}
							<span className="text-centre text-sm">
								Choose a shipping address and payment method to calculate
								shipping, handling and tax.
							</span>
						</div>
						<hr className="w-[98%] mx-auto h-2 border-black" />
						<p className="pl-2">Order Summary</p>
						<div className="flex-col font-bold w-full px-5">
							<div className="flex justify-between items-center pt-2">
								<div>{"Items: "}</div>
								<div>{"₹ " + totalPrice}</div>
							</div>
							<div className="flex justify-between items-center pt-2">
								<div>{"Delivery:"}</div>
								<div>{"Free"}</div>
							</div>
						</div>
						<p className="mb-4 text-xl pt-10 pl-2 flex justify-between font-bold text-blue-900 px-10">
							<span>Order Total ({totalQuantity} item) </span>
							<span> ₹{totalPrice}</span>
						</p>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}
export default CheckoutForm
