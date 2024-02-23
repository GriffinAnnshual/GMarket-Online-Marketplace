import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ordersSchema = new Schema({
	order_id: mongoose.Schema.Types.ObjectId,
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	items: [
		{
			productId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Product",
			},
			quantity: {
				type: Number,
				default: 1,
			},
			price: {
				type: Number,
				required: true,
			},
		},
	],
	totalAmount: {
		type: Number,
		required: true,
	},
	status: {
		type: String,
		enum: ["pending", "confirmed", "shipped", "delivered"],
		default: "pending",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

const Order = mongoose.Schema('Order', ordersSchema)
export default Order