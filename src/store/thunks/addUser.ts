import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../types";
import axios from "axios";
const addUser = createAsyncThunk('users/addUser', async({ name, email, age }: { name: string, email: string, age: number }) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const response = await axios.post<User>("http://localhost:5293/api/User", {
        name: name,
        email: email,
        age: age,
    });

    return response.data;
});

export { addUser };