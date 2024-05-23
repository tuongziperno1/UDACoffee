// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  email: "",
  username: "",
  phone: "",
  isAdmin : false,
  _id: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const { _id, username, email, phone, isAdmin } = action.payload;
      state._id = _id;
      state.username = username;
      state.email = email;
      state.isAdmin = isAdmin;
      state.phone = phone;
    },
    logout: (state) => {
      state._id = "";
      state.username = "";
      state.email = "";
      state.isAdmin = false;
      state.phone = "";
    },
    updateUserInfo: (state, action) => {
      const { _id, username, email, phone, isAdmin } = action.payload;
      state._id = _id;
      state.username = username;
      state.email = email;
      state.phone = phone;
      state.isAdmin = isAdmin;
    },
  },
});

export const { login, logout, updateUserInfo } = userSlice.actions;
export default userSlice.reducer;