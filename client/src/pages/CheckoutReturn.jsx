/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { useSelector , useDispatch} from "react-redux"
import { Navigate} from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import check from '../assets/images/check.png'
import visa from '../assets/images/visa.jpg'
import CartItems from "../components/CartItems"
import cartIcon from "../assets/images/shopping-cart.png"
import {Link} from 'react-router-dom'
import { paymentActions } from "../store/modules/payment/reducers"

function CheckoutReturn() {
  const dispatch = useDispatch()
  const itemList = useSelector((state)=> state.payment.itemList)
  const totalPrice = useSelector((state)=> state.payment.totalPrice)
  console.log(itemList)
    const [status, setStatus] = useState(null)
    const [customerEmail, setCustomerEmail] = useState("")
    useEffect(() => {
        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString)
        const sessionId = urlParams.get("session_id")
        const getCustomer = async () => {
        await axios
        .get(`http://localhost:3000/session-status?session_id=${sessionId}`)
        .then((res) => {
            setStatus(res.data.status)
            setCustomerEmail(res.data.customer_email)
        })
        }
        getCustomer();
    }, [])
  const handleBack =() =>{
    window.open("/")
  }
  if (status === 'open') {
      toast.warning(
				"Payment not successfull! Redirecting back to the payment page"
			)
    setTimeout(() => {
      return <Navigate to="/payment-form" />
    }, 2000);
  }

  if (status === 'complete') {
	dispatch(paymentActions.clearPaymentItemList())
	dispatch(paymentActions.clearPaymentTotalPrice())
	dispatch(paymentActions.clearPaymentState())
	dispatch(paymentActions.clearPaymentTotalQuantity())
	
    return (
			<section id="success">
				<div className="z-10 absolute top-0  right-0">
					<img
						className="w-64"
						src={visa}
						alt=""
					/>
				</div>

					<div className=" flex  gap-4 pt-5 items-center pl-10">
						<img
							src={cartIcon}
							className="md:w-[4%] md:h-[2%] "></img>
						<Link to="/">
							<h1 className="font-montserrat md:text-3xl font-bold text-[#37404a]">
								G Market
							</h1>
						</Link>
					</div>
          <div className="whitespace-nowrap text-blue-700 cursor-pointer pl-10 pt-4 " onClick={handleBack}>Back to Home</div>

				<div className="w-[100%] h-[100vh]">
					<div className=" w-[90%] mx-10 mb-10 mt-2 border-2 shadow-blue-600 shadow-md p-10 flex-col">
						<div className="flex gap-4 items-center">
							<img
								className="w-8 h-8"
								src={check}
								alt=""
							/>
							<div className="text-3xl font-bold text-green-600 font-sans">
								Payment confirmed
							</div>
						</div>
						<div className="text-md text-gray-500 w-[70%] my-10 mx-2 font-bold">
							{`Thank you, your payment has been successfull and your order is now confirmed. A confirmation email has been sent to ${customerEmail}
							    If you have any questions, please email`}{" "}
							<a href="mailto:gmarket@gmail.com">gmarket@gmail.com</a>.
						</div>
						<div className="font-bold mb-5">Order Summary</div>

						<div className="flex p-4 gap-2 w-[100%]  pr-10 pb-10   border-gray-300 border-2 ">
							<div className="">
								{itemList.map((items) => {
									if (items !== null) {
										return (
											<CartItems
												type="payment"
												key={items.id}
												itemDetails={items}
											/>
										)
									}
								})}
							</div>
							<div>
								<div className="relative top-[80%]  font-bold z-10 left-[15%]">
									<div className="whitespace-nowrap ">
										Total Price: ₹{totalPrice}
									</div>
									<div className="whitespace-nowrap text-sm text-gray-600">
										was charged successfully
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		)
  }

  return null;
}


export default CheckoutReturn