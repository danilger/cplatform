import { configureStore } from "@reduxjs/toolkit";
import isLoginSlice from "./slices/isLoginSlice";
import showLoginFormSlice from "./slices/showLoginFormSlice";
import showPostSlice from "./slices/showPostsSlice";

// ...

export const store = configureStore({
  reducer: {
    isLogin: isLoginSlice.reducer,
    showLoginForm: showLoginFormSlice.reducer,
    showPosts: showPostSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
