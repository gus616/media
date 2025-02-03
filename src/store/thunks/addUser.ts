import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../types";
import axios from "axios";
import { faker } from "@faker-js/faker";
const addUser = createAsyncThunk('users/addUser', async({ name, age }: { name: string, age: number }) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const response = await axios.post<User>("http://localhost:3005/users", {
        name: name,
        age: age,
    });

    return response.data;
});

export { addUser };