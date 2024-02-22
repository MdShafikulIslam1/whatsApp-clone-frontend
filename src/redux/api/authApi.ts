import { tagTypes } from "../tagTypes/tagTypes";
import baseApi from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    checkUser: build.mutation({
      query: (email: any) => ({
        url: "/auth/check-user",
        method: "POST",
        data: email,
      }),
      invalidatesTags: [tagTypes.USER],
    }),

    onboardUser: build.mutation({
      query: (payload: any) => ({
        url: "/auth/onboard-user",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: [tagTypes.USER],
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
  useCheckUserMutation,
  useOnboardUserMutation,
  useGetAllUserQuery,
} = authApi;
