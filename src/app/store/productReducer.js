import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const STATUSES = {
    IDLE: "idle",
    ERROR: "error",
    LOADING: "loading"
}

const productSlice = createSlice({
    name: "product",
    initialState: {
        data: [],
        status: STATUSES.IDLE
    },
    reducers:{},
extraReducers: (builder)=> {
builder.addCase(fetchProducts.pending,(state,action)=>{
state.status= STATUSES.LOADING;
}).addCase(fetchProducts.fulfilled,(state,action)=>{
    state.data = action.payload
   state.status= STATUSES.IDLE; 
}).addCase(fetchProducts.rejected,(state,action)=>{
     state.status= STATUSES.ERROR; 
})

}

    
})
export default productSlice.reducer;

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
      const res = await response.json();
      return res;

})