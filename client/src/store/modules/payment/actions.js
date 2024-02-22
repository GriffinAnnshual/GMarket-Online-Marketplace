import {createAction} from '@reduxjs/toolkit'


export const setPaymentState = () => createAction("payment/setPaymentState")
export const setPaymentError = () => createAction("payment/setPaymentError")
export const setPaymentItemList = () => createAction("payment/setPaymentItemList")
export const setPaymentTotalQuantity = () => createAction("payment/setPaymentTotalQuantity")
export const setPaymentTotalPrice = () => createAction("payment/setPaymentTotalPrice")
export const setPaymentAddress = () => createAction("payment/setPaymentAddress")
export const setPaymentMethod = () => createAction("payment/setPaymentMethod")
export const clearPaymentError = () => createAction("payment/clearPaymentError")
export const clearPaymentState = () => createAction("payment/clearPaymentState")
export const clearPaymentItemList = () => createAction("payment/clearPaymentItemList")
export const clearPaymentTotalQuantity = () => createAction("payment/clearPaymentTotalQuantity")
export const clearPaymentTotalPrice = () => createAction("payment/clearPaymentTotalPrice")
export const clearPaymentAddress = () => createAction("payment/clearPaymentAddress")
export const clearPaymentMethod = () => createAction("payment/clearPaymentMethod")
