"use client";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: { value: any } = {
  value: false,
};

export const showLoginFormSlice = createSlice({
  name: "showLoginForm",
  initialState,
  reducers: {
    setShowLoginForm: (state) => {
      state.value = !state.value;
    },
    onShowLoginForm: (state) => {
      state.value = true;
    },
    offShowLoginForm: (state) => {
      state.value = false;
    },
  },
});

export default showLoginFormSlice;
export const selectShowLoginForm = (state: RootState) =>
  state.showLoginForm.value;
export const { setShowLoginForm, onShowLoginForm, offShowLoginForm } =
  showLoginFormSlice.actions;
