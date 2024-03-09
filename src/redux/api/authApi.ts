import { tagTypes } from "../tagTypes/tagTypes";
import baseApi from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    createAccount: build.mutation({
      query: (user: any) => ({
        url: "/auth/create-account",
        method: "POST",
        data: user,
      }),
      invalidatesTags: [tagTypes.USER],
    }),
    login: build.mutation({
      query: (user: any) => ({
        url: "/auth/login",
        method: "POST",
        data: user,
      }),
      invalidatesTags: [tagTypes.USER],
    }),

    getSingleUser: build.query({
      query: (id: string) => ({
        url: `/auth/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.USER],
    }),
    getAllUser: build.query({
      query: () => ({
        url: "/auth/all-user",
        method: "GET",
      }),
      providesTags: [tagTypes.USER],
    }),
  }),
});

export const {
  useCreateAccountMutation,
  useLoginMutation,
  useGetAllUserQuery,
  useGetSingleUserQuery,
} = authApi;
