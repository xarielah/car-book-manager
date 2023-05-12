import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type User = {
  displayName: string;
  email: string;
  avatar: string;
  isAuthed: boolean;
  ownedCars: string[];
};

const initialState: User = {
  displayName: "",
  email: "",
  avatar: "",
  isAuthed: false,
  ownedCars: [],
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
      state.ownedCars = action.payload.ownedCars;
    },
    logoutUser(state) {
      state.displayName = initialState.displayName;
      state.email = initialState.email;
      state.avatar = initialState.displayName;
      state.isAuthed = initialState.isAuthed;
      state.ownedCars = initialState.ownedCars;
    },
  },
});

export const { authUser, logoutUser } = userSlice.actions;

export const currentUser = (state: RootState) => state.user;

export default userSlice.reducer;
