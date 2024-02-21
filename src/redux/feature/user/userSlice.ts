import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

interface IMessage {
  createdAt?: string;
  id?: string;
  message?: string;
  messageStatus?: string;
  receiverId?: string;
  senderId?: string;
  type?: string;
  updatedAt?: string;
}
export interface IUser {
  socket: Socket | null;
  messages: IMessage[];
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
  currentChatUserInfo: {
    id?: string | null;
    name: string | null;
    email: string | null;
    profilePhoto: string | null;
    about: string | null;
  } | null;
}

const initialState: IUser = {
  socket: null,
  messages: [],
  contactPage: false,
  image: "/default_avatar.png",
  newUser: false,
  userInfo: null,
  currentChatUserInfo: null,
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
    setCurrentChatUserInfo: (
      state,
      action: PayloadAction<{
        id?: string | null;
        name: string | null;
        email: string | null;
        profilePhoto: string | null;
        about: string | null;
      }>
    ) => {
      state.currentChatUserInfo = action.payload;
    },
    setMessage: (state, action: PayloadAction<IMessage[]>) => {
      state.messages = action.payload;
    },
    setSocket: (state, action: PayloadAction<any>) => {
      state.socket = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setImage,
  setNewUser,
  setUserInfo,
  setContactPage,
  setCurrentChatUserInfo,
  setMessage,
  setSocket,
} = userSlice.actions;

export default userSlice.reducer;
