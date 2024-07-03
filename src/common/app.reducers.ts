import { RootState } from "@/plugins";
import { createSlice } from "@reduxjs/toolkit";
interface IAppSlice {
  isOpenLoading: boolean;
  isOpenSidebar: boolean;
}

const initialState: IAppSlice = {
  isOpenLoading: false,
  isOpenSidebar: false,
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
    openSidebar: (state) => {
      state.isOpenSidebar = true;
    },
    closeSidebar: (state) => {
      state.isOpenSidebar = false;
    },
  },
});

export const { openLoading, closeLoading, openSidebar, closeSidebar } =
  appSlice.actions;
export const setHandleLoading = (state: RootState) => state.app?.isOpenLoading;
export const setHandleSidebar = (state: RootState) => state.app?.isOpenSidebar;
export default appSlice.reducer;
