import {createSlice} from '@reduxjs/toolkit'



const cartSlice = createSlice({
    name: "cart",
    initialState: {
        itemList: [],
        totalQuantity: 0,
        totalPrice: 0,
        error: null
    }, 
    reducers: {
        addItemToCart(state, action) {
            const item = action.payload
            const itemIndex = state.itemList.findIndex(item => item.id === action.payload.id)
            if (itemIndex === -1) {
                state.itemList.push(item)
            } else {
                state.itemList[itemIndex].quantity += item.quantity
            }
            state.totalQuantity += item.quantity
            state.totalPrice += item.price * item.quantity
        },
        removeItemFromCart(state, action) {
            const item = action.payload
            const itemIndex = state.itemList.findIndex(item => item.id === action.payload.id)
            if (itemIndex !== -1) {
                state.totalQuantity -= item.quantity
                state.totalPrice -= item.price * item.quantity
                state.itemList.splice(itemIndex, 1)
            }
        },
        updateItemQuantity(state, action) {
            const item = action.payload
            const itemIndex = state.itemList.findIndex(item => item.id === action.payload.id)
            if (itemIndex !== -1) {
                state.totalQuantity += item.quantity
                state.totalPrice += item.price * item.quantity
                state.itemList[itemIndex].quantity = item.quantity
            }
        },
        setCartError(state, action) {
            state.error = action.payload
        },
        clearCartError(state) {
            state.error = null
        },
        clearCart(state) {
            state.itemList = []
            state.totalQuantity = 0
            state.totalPrice = 0
            state.error = null
        }
    }
})

export default cartSlice;