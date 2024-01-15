import { createSlice } from "@reduxjs/toolkit"


const mailSlice = createSlice({
	name: "emailVerified",
	initialState: { emailVerified: false },
	reducers: {
		setEmailVerified(state, action) {
			state.emailVerified = action.payload
		},
	},
})

const reducer = mailSlice.reducer
export const { setEmailVerified } = mailSlice.actions
export default reducer