import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  contactPage: boolean;
  image: string;
  newUser: boolean;
  userInfo: {
    id?: string | null;
    name: string | null;
    email: string | null;
    profilePhoto: string | null;
    about: string | null;
  } | null;
}

const initialState: IUser = {
  contactPage: false,
  image: "/default_avatar.png",
  newUser: false,
  userInfo: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setContactPage: (state) => {
      state.contactPage = !state.contactPage;
    },
    setImage: (state, action: PayloadAction<string>) => {
      state.image = action.payload;
    },
    setNewUser: (state, action: PayloadAction<boolean>) => {
      state.newUser = action.payload;
    },
    setUserInfo: (
      state,
      action: PayloadAction<{
        id?: string | null;
        name: string | null;
        email: string | null;
        profilePhoto: string | null;
        about: string | null;
      }>
    ) => {
      state.userInfo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setImage, setNewUser, setUserInfo, setContactPage } =
  userSlice.actions;

export default userSlice.reducer;
