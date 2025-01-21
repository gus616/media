import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../types";


const fetchUsers = createAsyncThunk<User[], void>(
    'users/fetchByIdStatus',
    async()  => {
        const response = await axios.get<User[]>('http://localhost:3005/users');

        //DEV ONLY
        await pause(1000);

        return response.data;
    }
);

const pause = (duration: number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(null);
        }, duration)
    })
}

export { fetchUsers };