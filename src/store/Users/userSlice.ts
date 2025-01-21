import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsers";
import { User } from "../../types";

type UserState = {
    isLoading: boolean,
    data: User[] | null,
    error: string | null | undefined
};

const initialState: UserState = {
    isLoading: false,
    data: [],
    error: null
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(fetchUsers.pending, (state: UserState) => {
            state.isLoading = true;
        })

        builder.addCase(fetchUsers.fulfilled, (state: UserState, action: PayloadAction<User[]>) => {
            state.isLoading = false;
            state.data = action.payload;
        });

        builder.addCase(fetchUsers.rejected, (state: UserState, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    }
});

export const usersReducer = usersSlice.reducer;