import mongoose from 'mongoose';

const Schema = mongoose.Schema


const productsSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    img:{
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    description: {
        type : String,
        required : true
    },
    seller_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        required : true
    },
    category : {
        type : String,
        required : true
    },
    reviews : [
        {
            user_id : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'User',
                required : true
            },
            review : {
                type : String,
                required : true
            },
            rating : {
                type : Number,
                required : true
            }
        }
    ],
    sold: {
        type: Boolean,
        required : true,
        default: false
    },
    quantity: {
        type: Number,
        required : true,
        default: 1
    }
})

const Product = mongoose.model('Product',productsSchema);
export default Product