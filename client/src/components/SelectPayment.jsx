import {useSelector, useDispatch} from 'react-redux'
import { paymentActions } from "../store/modules/payment/reducers"
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { loadStripe } from "@stripe/stripe-js"
import {
	EmbeddedCheckoutProvider,
	EmbeddedCheckout,
} from "@stripe/react-stripe-js"

import axios from "axios"
import { useEffect, useState } from 'react'

function SelectPayment() {
	const dispatch = useDispatch()
	const savedAddress = useSelector((state)=> state.payment.address)
	const addressString = savedAddress.name + "\n" + savedAddress.address + "\n" + savedAddress.city + "\n" + savedAddress.state + "\n" + savedAddress.pincode
	const handleAddressChange = () => {
		toast.info("Redirecting to Address Form...")
		setTimeout(() => {
			dispatch(paymentActions.setPaymentState("address"))
			dispatch(paymentActions.setPaymentAddress(null))
		}, 2000);
	}

	const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
	const [clientSecret, setClientSecret] = useState("")
	const itemList = useSelector((state) => state.payment.itemList)
	useEffect(() => {
		const getClientSecret = async () => {
			const response = await axios.post(
				`http://localhost:3000/create-checkout-session`,
				{
					itemList: itemList,
				}
			)
			setClientSecret(response.data.clientSecret)
			console.log(clientSecret)
		}
		getClientSecret()
	}, [clientSecret, itemList])

	return (
		<div className="w-[70%]">
			<div className="flex w-full justify-between items-center border-black border-2 py-5 my-5">
				<div className="w-[35%] text-center">
					<p className="font-sans font-bold py-2">1. Delivery Address</p>
				</div>
				<div className="w-[35%] text-sm text-justify whitespace-pre ">
					{addressString}
				</div>
				<div
					className="w-[35%] text-sm text-center text-blue-700 cursor-pointer"
					onClick={handleAddressChange}>
					Change
				</div>
			</div>
			<div className=" border-black border-2">
				<div>
					<div className="flex flex-col p-4 px-8">
						<div className="text-xl font-bold pb-4 pl-2">
							2. Select a Payment method
						</div>
						<div className="w-[100%] flex flex-col gap-4">
							{clientSecret && (
								<EmbeddedCheckoutProvider
									stripe={stripePromise}
									options={{ clientSecret }}>
									<EmbeddedCheckout />
								</EmbeddedCheckoutProvider>
							)}
						</div>
						<hr className="mt-10 mb-2 w-full h-2 border-black" />
						<p className="pl-2">3. Items and Delivery</p>
						<hr className="my-4  w-full h-2 border-black" />
					</div>
				</div>
			</div>
		</div>
	)
}

export default SelectPayment;

