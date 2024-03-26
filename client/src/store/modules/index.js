import { combineReducers } from "redux"
import authReducer from "./auth/reducers"
import cartReducer from "./cart/reducers"
import paymentReducer from "./payment/reducers"



const rootReducer = combineReducers({
	auth: authReducer, 
	cart: cartReducer,
	payment: paymentReducer,
})

export default rootReducer
