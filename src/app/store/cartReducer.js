"use client"
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers:{
add(state, action) {
  const exists = state.find((item) => item._id === action.payload._id);
  if (!exists) {
    state.push(action.payload);
  }
},
    
remove(state, action) {
  return state.filter((item) => item._id !== action.payload);
},
clearCart(){
return [];
},

setCart(state, action) {
      return action.payload; 
    },

    }
})
export const {add,remove,setCart,clearCart} = cartSlice.actions;
export default cartSlice.reducer;