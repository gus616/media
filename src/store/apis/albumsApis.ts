import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Album, User } from '../../types';

export const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3005' }),
  tagTypes: ['Album'],
  endpoints: (builder) => ({
    getAlbums: builder.query<Album[], User>({
      query: (user: User) => {
        return {
          url: 'albums',
          params: {
            userId: user.id,
          },
          method: 'GET',
        };
      },
      providesTags: (result, error, user) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Album', id } as const)),
              { type: 'Album', id: `USER_${user.id}` },
            ]
          : [{ type: 'Album', id: `USER_${user.id}` }],
    }),
    createAlbum: builder.mutation<Album, Album>({
      query: (body) => ({
        url: 'albums',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, { userId }) => [{ type: 'Album', id: `USER_${userId}` }],
    }),
    removeAlbum: builder.mutation<Album, number>({
      query: (id) => ({
        url: `albums/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Album', id }],
    }),
  }),
});

export const {
  useGetAlbumsQuery,
  useCreateAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi;
