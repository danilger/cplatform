import getAllPosts from "@/app/helpers/posts/getAllPosts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const fetchAllPosts = createAsyncThunk(
  "showPosts/fetchAllPosts",
  async () => {
    const response = await getAllPosts();
    return response;
  }
);

export const showPostSlice = createSlice({
  name: "showPosts",
  initialState: { value: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export default showPostSlice;
export const selectShowPost = (state: RootState) => state.showPosts.value;
