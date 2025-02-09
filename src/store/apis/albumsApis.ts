import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Album, User } from '../../types';

export const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5293/api' }),
  tagTypes: ['Album'],
  endpoints: (builder) => ({
    getAlbums: builder.query<Album[], User>({
      query: (user: User) => {
        return {
          url: 'Album',
          params: {
            userId: user.id,
          },
          method: 'GET',
        };
      },
      providesTags: (result, error, user) =>
        [{ type: 'Album', id: `USER_${user.id}` }],
    }),
    createAlbum: builder.mutation<Album, Album>({
      query: (body) => ({
        url: 'Album',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, { userId }) => [{ type: 'Album', id: `USER_${userId}` }],
    }),
    removeAlbum: builder.mutation<Album, Album>({
      query: ({ id }) => ({
        url: `Album/${id}`, 
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { userId }) => [{ type: 'Album', id: `USER_${userId}` }],
    }),
  }),
});

export const {
  useGetAlbumsQuery,
  useCreateAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi;
