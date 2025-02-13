import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types';
import axios from 'axios';
import { toast } from 'react-toastify';

const addUser = createAsyncThunk(
  'users/addUser',
  async ({
    name,
    email,
    age,
  }: {
    name: string;
    email: string;
    age: number;
  }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const response = await axios
      .post<User>('http://localhost:5293/api/User', {
        name: name,
        email: email,
        age: age,
      })
      .then((response) => response)
      .catch((error) => {
        const { data } = error.response;


        let errorMessage = 'Failed to add user:';

        data.forEach((error: { errorMessage: string }) => {
          errorMessage += ` ${error.errorMessage}`;
        });

        toast.error(errorMessage, {
            position: 'bottom-right',
        });

        return null;
      });

    if (response) {
      toast.success('User added successfully', {
        position: 'bottom-right',
      });
      return response.data;
    } else {
      throw new Error('Failed to add user');
    }
  }
);

export { addUser };
