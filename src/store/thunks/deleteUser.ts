import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../../types';

const deleteUser = createAsyncThunk('users/deleteUser', async (id: number) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  // Fetch all albums associated with the user
  const responseAlbums = await axios.get(
    `http://localhost:5293/api/Album?userId=${id}`,
    {
      headers,
    }
  );
  const albums = responseAlbums.data;

  // Delete all albums associated with the user
  for (const album of albums) {
    await axios.delete(`http://localhost:5293/api/Album/${album.id}`,{
      headers,
    });
  }

  const response = await axios.delete<User>(
    'http://localhost:5293/api/User/' + id,
    {
      headers,
    }
  );

  return response.data;
});

export { deleteUser };
