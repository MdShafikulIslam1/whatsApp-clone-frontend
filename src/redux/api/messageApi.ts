import { tagTypes } from "../tagTypes/tagTypes";
import baseApi from "./baseApi";

const messageApi = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    addMessage: build.mutation({
      query: (data: { message: string; from: string; to: string }) => ({
        url: "/messages/add-message",
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.MESSAGE],
    }),
    getAllMessage: build.query({
      query: ({ from, to }: { from: string; to: string }) => {
        return {
          url: `/messages/${from}/${to}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.MESSAGE],
    }),
  }),
});

export const { useAddMessageMutation, useGetAllMessageQuery } = messageApi;
