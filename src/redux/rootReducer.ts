import baseApi from "./api/baseApi";
import userReducer from "@/redux/feature/user/userSlice";

const reducer = {
  user: userReducer,
  [baseApi.reducerPath]: baseApi.reducer,
};
export default reducer;
