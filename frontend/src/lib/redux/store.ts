import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user.slice";

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
  devTools: import.meta.env.PROD ? false : true,
});

export type RootState = ReturnType<typeof store.getState>;
