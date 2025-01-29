import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsers";
import { addUser } from "../thunks/addUser";
import { User } from "../../types";
import { deleteUser } from "../thunks/deleteUser";

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
        });

        builder.addCase(addUser.pending, (state: UserState) => {
            state.isLoading = true;
        });

        builder.addCase(addUser.fulfilled, (state: UserState, action: PayloadAction<User>) => {
            state.isLoading = false;
            state.data?.push(action.payload);
        });

        builder.addCase(addUser.rejected, (state: UserState, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        builder.addCase(deleteUser.pending, (state: UserState) => {
            state.isLoading = true;            
        });

        builder.addCase(deleteUser.fulfilled, (state: UserState, action) => {
            state.isLoading = false;
            if (state.data) {
                state.data = state.data.filter(user => user.id !== action.payload.id);
            }
        });

        builder.addCase(deleteUser.rejected, (state: UserState, action) => {
            state.error = action.error.message;
        });
    }
});

export const usersReducer = usersSlice.reducer;