import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./Users/userSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { albumsApi } from "./apis/albumsApis";
import { authApi } from "../services/authApi";
import authReducer from "./Auth/AuthSlice";
import { photosApi } from "./apis/photosApis";

export const store = configureStore({
    reducer: {
        users: usersReducer,
        auth: authReducer,
        [albumsApi.reducerPath]: albumsApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [photosApi.reducerPath]: photosApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(albumsApi.middleware, authApi.middleware, photosApi.middleware),
    
    
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsSate, users: UsersState}
export type AppDispatch = typeof store.dispatch

