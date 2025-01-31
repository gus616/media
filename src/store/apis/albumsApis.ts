import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Album } from '../../types';

export const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3005' }),
  endpoints: (builder) => ({
    getAlbums: builder.query<Album[], void>({
      query: () => '/albums',
    }),
    createAlbum: builder.mutation<Album, Album>({
      query: (body) => ({
        url: 'albums',
        method: 'POST',
        body,
      }),
    }),
    removeAlbum: builder.mutation<Album, number>({
      query: (id) => ({
        url: `albums/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetAlbumsQuery, useCreateAlbumMutation, useRemoveAlbumMutation } = albumsApi;
