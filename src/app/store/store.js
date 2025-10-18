import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartReducer.js"
import productReducer from "./productReducer.js"
const store = configureStore({
    reducer:{
        cart: cartReducer,
        product: productReducer
    }
})
export default store;