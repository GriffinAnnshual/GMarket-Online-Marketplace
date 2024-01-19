import { createSlice } from "@reduxjs/toolkit"


const authSlice = createSlice({
	name: "auth",
	initialState: { 
		emailVerified: false ,
		isAuthenticated: false
		
	},
	reducers: {
		setIsAuthenticated(state,action){
			state.isAuthenticated = action.payload;
		},
		setEmailVerified(state, action) {
			state.emailVerified = action.payload
		},
	},
})

const authReducer = authSlice.reducer
export const { setEmailVerified } = authSlice.actions
export default authReducer