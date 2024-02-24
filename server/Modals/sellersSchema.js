import mongoose from 'mongoose'

const Schema = mongoose.Schema

const sellersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    profile_pic: {
        type: String,
        required: false
    },
    reviews: [
        {
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            review: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            }
        }
    ],
    products: [
        {
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
        }
    ],
})


const Seller = mongoose.model('Seller', sellersSchema)
export default Seller