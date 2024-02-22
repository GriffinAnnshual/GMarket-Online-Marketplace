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
                state.totalQuantity += 1
            } else {
                state.itemList[itemIndex].quantity += 1
            }
            state.totalPrice += item.price
        },
        removeItemFromCart(state, action) {
            const item = action.payload
            const itemIndex = state.itemList.find(item => item.id === action.payload.id)
            if (itemIndex) {
                state.totalPrice -= item.price 
                if (itemIndex.quantity === 1){
                state.itemList = state.itemList.filter((items)=> items.id !== action.payload.id)
                state.totalQuantity -= 1;
                }else{
                    itemIndex.quantity -= 1
                }
            }
        },
        updateItemQuantity(state, action) {
            const item = action.payload
            const itemIndex = state.itemList.find(item => item.id === action.payload.id)
            if (itemIndex) {
                state.totalPrice += item.price
                itemIndex.quantity += 1
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
        },
        updateChecked(state,action){
            state.itemList.map((item)=>{
                if(item.id === action.payload.id){
                    item.checked = action.payload.checked
                }
            }
            )
        },
        deselectAll(state){
            state.itemList.map((item)=>{
                item.checked = false
            })
        }
    }
})
export const actions = cartSlice.actions
const cartReducer = cartSlice.reducer
export default cartReducer