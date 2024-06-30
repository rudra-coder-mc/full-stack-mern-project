import { configureStore } from "@reduxjs/toolkit";
import Auth from "../Feachers/Auth/AuthSlice";
const store = configureStore({
  reducer: { Auth },
});

export default store;
