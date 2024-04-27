import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "@/plugins/redux-toolkit/store";

interface AuthState {
  isLoggedIn: boolean;
  // user: IUser | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  // user: null,
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedin: (state) => {
      state.isLoggedIn = true;
      // state.user = action.payload;
    },
    loggedout: (state) => {
      state.isLoggedIn = false;
      // state.user = null;
    },
  },
});

export const { loggedin, loggedout } = auth.actions;
export const setLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export default auth.reducer;
