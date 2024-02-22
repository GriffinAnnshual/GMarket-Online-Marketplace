import {createSlice} from '@reduxjs/toolkit'



const paymentSclice = createSlice({
    name: 'payment',
	initialState: {
		currentState: "address",
		error: null,
		itemList: [],
		totalQuantity: 0,
		totalPrice: 0,
		address: null,
		paymentMethod: null,
	},

	reducers: {
		setPaymentState(state, action) {
			state.currentState = action.payload
		},
		setPaymentError(state, action) {
			state.error = action.payload
		},
		setPaymentItemList(state, action) {
			state.itemList = action.payload
		},
		setPaymentTotalQuantity(state, action) {
			state.totalQuantity = action.payload
		},
		setPaymentTotalPrice(state, action) {
			state.totalPrice = action.payload
		},
		setPaymentAddress(state, action) {
			state.address = action.payload
		},
		setPaymentMethod(state, action) {
			state.paymentMethod = action.payload
		},
		clearPaymentError(state) {
			state.error = null
		},
		clearPaymentState(state) {
			state.currentState = null
		},
		clearPaymentItemList(state) {
			state.itemList = []
		},
		clearPaymentTotalQuantity(state) {
			state.totalQuantity = 0
		},
		clearPaymentTotalPrice(state) {
			state.totalPrice = 0
		},
		clearPaymentAddress(state) {
			state.address = null
		},
		clearPaymentMethod(state) {
			state.paymentMethod = null
		},
	},
})


export const paymentActions = paymentSclice.actions
const paymentReducer = paymentSclice.reducer
export default paymentReducer