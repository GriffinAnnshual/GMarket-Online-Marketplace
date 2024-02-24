import * as mongoose from "mongoose";

const Schema = mongoose.Schema

const ordersSchema = new Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	items: [
		{
			product_id: {
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

const Order = mongoose.model('Order', ordersSchema)
export default Order