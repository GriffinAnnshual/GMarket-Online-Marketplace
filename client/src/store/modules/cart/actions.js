import {createAction} from '@reduxjs/toolkit'


export const addItemToCart = () => createAction("cart/addItemToCart")
export const removeItemFromCart = () => createAction("cart/removeItemFromCart")
export const updateItemQuantity = () => createAction("cart/updateItemQuantity")
export const setCartError = () => createAction("cart/setCartError")
export const clearCartError = () => createAction("cart/clearCartError")
export const clearCart = () => createAction("cart/clearCart")
export const updateChecked = () => createAction("cart/updateChecked")
export const deselectAll = () => createAction("cart/deselectAll")