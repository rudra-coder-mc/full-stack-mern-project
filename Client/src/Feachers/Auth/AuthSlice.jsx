import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  Token: "",
  userData: {},
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      // console.log(action.payload);
      // console.log(action.payload.Token);
      // console.log(action.payload.userData);
      state.status = true;
      state.Token = action.payload.Token;
      state.userData = action.payload.userData;
      
    },
    logout: (state, action) => {
      state.status = false;
      state.Token = "";
      state.userData = {};
    },
    
  },
});

export default AuthSlice.reducer;

export const { login, logout } = AuthSlice.actions;
