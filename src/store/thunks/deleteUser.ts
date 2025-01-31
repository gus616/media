import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../../types';

const deleteUser = createAsyncThunk('users/deleteUser', async (id: number) => {
  console.log('Deleting user with id: ', id);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Fetch all albums associated with the user
  const responseAlbums = await axios.get(`http://localhost:3005/albums?userId=${id}`);
  const albums = responseAlbums.data;

    // Delete all albums associated with the user
    for (const album of albums) {
        await axios.delete(`http://localhost:3005/albums/${album.id}`);
    }

  const response = await axios.delete<User>(
    'http://localhost:3005/users/' + id
  );

  return response.data;
});

export { deleteUser };
