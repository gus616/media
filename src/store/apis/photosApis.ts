import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Album, Photo } from '../../types';

const photosApi = createApi({
  reducerPath: 'photosApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3005' }),
  tagTypes: ['Photo'], // Define the tag type here
  endpoints: (builder) => ({
    getPhotos: builder.query<Photo[], { albumId: number }>({
      query: ({ albumId }) => ({
        url: '/photos',
        params: { albumId },
        method: 'GET',
      }),
      providesTags: (result, error, { albumId }) => [
        { type: 'Photo', id: albumId },
      ],
    }),
    addPhoto: builder.mutation({
      query: ({ album, url }: { album: Album; url: string }) => {
        return {
          url: '/photos',
          method: 'POST',
          body: { albumId: album.id, url },
        };
      },
      invalidatesTags: (result, error, { album }) => [
        { type: 'Photo', id: album.id },
      ],
    }),
    deletePhoto: builder.mutation({
      query: ({ id }: { id: number }) => {
        return {
          url: `/photos/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Photo', id }],
    }),
  }),
});

export const {
  useGetPhotosQuery,
  useAddPhotoMutation,
  useDeletePhotoMutation,
} = photosApi;

export { photosApi };
