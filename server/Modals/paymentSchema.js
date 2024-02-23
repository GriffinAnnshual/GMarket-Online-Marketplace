import mongoose from 'mongoose'

const Schema = mongoose.Schema

const paymentsSchema = new Schema({
	order_id: {
		type: mongoose.Schema.Types.ObjectId,
		refs: "Order",
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	status: {
		type: String,
		enum: ["pending", "success", "failed"],
		default: "pending",
	},
	paymentMethod: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

const Payment = mongoose.model('payment', paymentsSchema)
export default Payment