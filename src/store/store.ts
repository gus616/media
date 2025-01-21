import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./Users/userSlice";
export const store = configureStore({
    reducer: {
        users: usersReducer
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsSate, users: UsersState}
export type AppDispatch = typeof store.dispatch

