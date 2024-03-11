import { combineReducers } from "redux"
import authReducer from "./auth/reducers"
import cartReducer from "./cart/reducers"
import paymentReducer from "./payment/reducers"
import storageSession from "redux-persist/lib/storage/session"
import{ persistReducer }from "redux-persist"


// seperate config for auth reducer.
const authPersistConfig = { key: 'auth', storage:storageSession, timeout: 3600000 }; // This config is to use session storage for auth.

const rootReducer = combineReducers({
	auth: persistReducer(authPersistConfig, authReducer), 
	cart: cartReducer,
	payment: paymentReducer,
})

export default rootReducer
