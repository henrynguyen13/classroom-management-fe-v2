import { RootState } from "@/plugins";
import { createSlice } from "@reduxjs/toolkit";
interface IAppSlice {
  isOpenLoading: boolean;
}

const initialState: IAppSlice = {
  isOpenLoading: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    openLoading: (state) => {
      state.isOpenLoading = true;
    },
    closeLoading: (state) => {
      state.isOpenLoading = false;
    },
  },
});

export const { openLoading, closeLoading } = appSlice.actions;
export const setHandleLoading = (state: RootState) => state.app?.isOpenLoading;
export default appSlice.reducer;
