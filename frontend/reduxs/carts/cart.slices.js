import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  tableNumber: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item._id === newItem._id);
      if (existingItem) {
        existingItem.quantity++; // Increase quantity if item already exists
      } else {
        state.items.push({ ...newItem, quantity: 1 }); // Add new item with quantity 1
      }
    },
    decreaseQuantity: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find(item => item._id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--; // Decrease quantity if more than 1
      } else {
        state.items = state.items.filter(item => item._id !== itemId); // Remove item if quantity is 1
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter(item => item._id !== itemId);
    },
    clearCart: (state) => {
      state.items = [];
    },
    updateTableNumber: (state, action) => {
      state.tableNumber = action.payload;
    },
  }
});

export const { addToCart, decreaseQuantity, removeFromCart, clearCart, updateTableNumber } = cartSlice.actions;
export default cartSlice.reducer;
