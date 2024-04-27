import { createSlice } from "@reduxjs/toolkit";
import { IClass } from "../interfaces";

export const classList = createSlice({
  name: "classList",
  initialState: {
    classes: [] as IClass[],
  },
  reducers: {
    setClass: (state, action) => {
      state.classes = action.payload;
    },
  },
});

export const { setClass } = classList.actions;
export default classList.reducer;
