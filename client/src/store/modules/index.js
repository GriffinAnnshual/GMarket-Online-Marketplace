import { combineReducers } from "redux"
import authReducer from "./auth/reducers"
import cartReducer from "./cart/reducers"
const rootReducer = combineReducers({
	auth: authReducer,
	cart: cartReducer,
})

export default rootReducer
