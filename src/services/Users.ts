import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5293/api/User/' }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: 'getUsers'
      })
    }),
  }),
});

export const { useGetUsersQuery } = userApi;