import Stripe from "stripe"



const stripe = Stripe(process.env.STRIPE_SECRET_KEY)


//---------------------------------stripe integration routes --------------------------------------

const generate_PriceID = async (itemList) => {
	// Use Promise.all to wait for all asynchronous operations to complete
	const updatedItemList = await Promise.all(
		itemList.map(async (items) => {
			if(items !== null){
				const product = await stripe.products.create({
				name: items.name,
			})
			const price = await stripe.prices.create({
				product: product.id,
				unit_amount: (items.price).toFixed(2) * 100,
				currency: "INR",
			})
			return { price: price.id, quantity: items.quantity }
			}
		})
	)

	return updatedItemList
}

const DOMAIN_NAME = "http://localhost:5173"

export const createPaymentSession = async (req, res) => {
	const { itemList } = req.body
	console.log(itemList)

	const items = await generate_PriceID(itemList)
	const session = await stripe.checkout.sessions.create({
		ui_mode: "embedded",
		line_items: items,
		mode: "payment",
		return_url: `${DOMAIN_NAME}/return?session_id={CHECKOUT_SESSION_ID}`,
	})
	res.send({ clientSecret: session.client_secret })
}

export const sessionStatus =  async (req, res) => {
	const session = await stripe.checkout.sessions.retrieve(req.query.session_id)

	res.send({
		status: session.status,
		customer_email: session.customer_details.email,
	})
}


//-----------------------------------------------payments-routes----------------------------------------

export const addPayment = (req, res) => {

}