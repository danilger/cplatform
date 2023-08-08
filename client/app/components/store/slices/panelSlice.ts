"use client";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const panelSlice = createSlice({
  name: "displayCreatePost",
  initialState: { value: { display: "none" } },
  reducers: {
    setDisplayCreatePosts: (state, action) => {
      state.value = action.payload;
    },
    onDisplayCreatePost: (state) => {
      state.value = { display: "flex" };
    },
    offDisplayCreatePost: (state) => {
      state.value = { display: "none" };
    },
  },
});

export default panelSlice;
export const selectPanelSlice = (state: RootState) => state.panel.value;
export const {
  setDisplayCreatePosts,
  onDisplayCreatePost,
  offDisplayCreatePost,
} = panelSlice.actions;
