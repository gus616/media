import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5293/api/Auth/',
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'loginUser',
        method: 'POST',
        body: credentials,
      }),
    }),
    signUp: builder.mutation({
      query: (userData) => ({
        url: 'register',
        method: 'POST',
        body: userData,
      })
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation } = authApi;
