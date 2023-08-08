"use client";
import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";
import { RootState } from "../store";

const initialState: { value: any } = {
  value: false,
};

export const isLoginSlice = createSlice({
  name: "isLogin",
  initialState,
  reducers: {
    setIsLogin: (state) => {
      state.value = getCookie("user_logged_in");
    },
    onIsLogin: (state) => {
      state.value = true;
    },
    offIsLogin: (state) => {
      state.value = false;
    },
  },
});

export default isLoginSlice;
export const selectIsLogin = (state: RootState) => state.isLogin.value;
export const { setIsLogin, onIsLogin, offIsLogin } = isLoginSlice.actions;
