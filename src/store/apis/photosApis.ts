import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

/* const photosApi = createApi({
    reducerPath: "photosApi",
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3005'}),
    endpoints: (builder) => ({
        getPhotos: builder.query({
            query: () => "photos",
        }),
        addPhoto: builder.mutation({}),
        deletePhoto: builder.mutation({}),
    }),
});

export const { useGetPhotosQuery } = photosApi; */