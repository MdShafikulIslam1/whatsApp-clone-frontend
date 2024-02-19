import { getBaseUrl } from "@/helpers/config/envConfig";
import { tagTypeList } from "../tagTypes/tagTypes";
import { axiosBaseQuery } from "@/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: getBaseUrl() as string }),
  endpoints: () => ({}),
  tagTypes: tagTypeList,
});
export default baseApi;
