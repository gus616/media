import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Album, Photo } from '../../types';

const photosApi = createApi({
  reducerPath: 'photosApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5293/api' }),
  tagTypes: ['Photo'], // Define the tag type here
  endpoints: (builder) => ({
    getPhotos: builder.query<Photo[], { albumId: number }>({
      query: ({ albumId }) => ({
        url: '/Photo',
        params: { albumId },
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${localStorage.getItem('token')}`                  
        }        
      }),
      providesTags: (result, error, { albumId }) => [
        { type: 'Photo', id: albumId },
      ],
    }),
    addPhoto: builder.mutation({
      query: ({ album, url, description }: { album: Album; url: string, description: string }) => {
        return {
          url: '/Photo',
          method: 'POST',
          body: { albumId: album.id, url, description },
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        };
      },
      invalidatesTags: (result, error, { album }) => [
        { type: 'Photo', id: album.id },
      ],
    }),
    deletePhoto: builder.mutation({
      query: ({ id }: { id: number }) => {
        return {
          url: `/Photo/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Photo', id }],
    }),
    uploadPhoto: builder.mutation({
      query: ({ file }: { file: File }) => {
        const formData = new FormData();
        formData.append('file', file);
        return {
          url: '/Photo/upload',
          method: 'POST',
          body: formData,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        };
      },
    }),
  }),
});

export const {
  useGetPhotosQuery,
  useAddPhotoMutation,
  useDeletePhotoMutation,
  useUploadPhotoMutation,
} = photosApi;

export { photosApi };
