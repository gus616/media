import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../types";


const deleteUser = createAsyncThunk('users/deleteUser', async(id: number) => {
   console.log("Deleting user with id: ", id);
    await new Promise(resolve => setTimeout(resolve, 1000));
     const response = await axios.delete<User>("http://localhost:3005/users/" + id);

    return response.data;
});

export { deleteUser };