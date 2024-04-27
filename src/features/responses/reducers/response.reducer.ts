import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICreateResponse } from "../interfaces";
import { IQuestion } from "@/features/questions/interfaces";

interface ResponsesState {
  responses: ICreateResponse[];
  totalQuestions: number;
  currentIndex: number;
  questions: IQuestion[];
}

const initialState: ResponsesState = {
  responses: [],
  totalQuestions: 0,
  currentIndex: 0,
  questions: [],
};

const responsesSlice = createSlice({
  name: "responses",
  initialState,
  reducers: {
    addResponse: (state, action: PayloadAction<ICreateResponse>) => {
      state.responses.push(action.payload);
    },
    resetResponses: (state) => {
      state.responses = [];
      state.currentIndex = 0;
    },
    setTotalQuestions: (state, action: PayloadAction<number>) => {
      state.totalQuestions = action.payload;
    },
    setCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },

    setQuestions: (state, action: PayloadAction<IQuestion[]>) => {
      state.questions = action.payload;
    },
  },
});

export const {
  addResponse,
  resetResponses,
  setTotalQuestions,
  setCurrentIndex,
  setQuestions,
} = responsesSlice.actions;

export default responsesSlice.reducer;
