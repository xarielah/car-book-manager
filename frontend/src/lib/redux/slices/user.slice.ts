import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type User = {
  displayName: string;
  email: string;
  avatar: string;
  isAuthed: boolean;
};

const initialState: User = {
  displayName: "",
  email: "",
  avatar: "",
  isAuthed: false,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    authUser(state, action: PayloadAction<User>) {
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.avatar = action.payload.avatar;
      state.isAuthed = true;
    },
    logoutUser(state) {
      state.displayName = initialState.displayName;
      state.email = initialState.email;
      state.avatar = initialState.displayName;
      state.isAuthed = initialState.isAuthed;
    },
  },
});

export const { authUser, logoutUser } = userSlice.actions;

export const currentUser = (state: RootState) => state.user;

export default userSlice.reducer;
