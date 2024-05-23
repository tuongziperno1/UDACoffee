// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./accounts/account.slices.js";
import cartReduce from "./carts/cart.slices.js";
// import searchReducer from "./slices/searchSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReduce,
        // search: searchReducer,
    },
});

export default store;