import { IGenericErrorResponse, ISuccessResponse } from "@/types/globalType";
import axios from "axios";

export const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    //     const accessToken = getFromLocalStorage(key)
    //if(accessToken) config.headers.Authorization = accessToken
    //TODO: local storage theke accesstoken niye hedears a pathate hbe
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    //TODO:need to console.log(response)
    const responseData: ISuccessResponse = {
      data: response.data.data,
      meta: response.data.meta,
    };
    return responseData;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    //TODO:need to console.log(error)
    const errorData: IGenericErrorResponse = {
      statusCode: error?.data?.statusCode || 500,
      message: error?.data?.message || "something went wrong",
      errorMessages: error?.data?.message,
    };
    return Promise.reject(errorData);
  }
);
