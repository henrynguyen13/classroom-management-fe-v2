import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICreateResponse } from "@/features/responses";
import { RootState } from "@/plugins";
export interface ISelectAnswer {
  currentIndex: number;
  answers: string[];
}
interface TestState {
  selectedQuestion: number;
  answered: boolean[];
  selectedAnswer: ISelectAnswer[];
  responses: ICreateResponse[];
}

const initialState: TestState = {
  selectedQuestion: 1,
  answered: [],
  selectedAnswer: [],
  responses: [],
};
export const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    selectQuestion: (state, action: PayloadAction<number>) => {
      state.selectedQuestion = action.payload;
    },
    answeredQuestion: (state, action: PayloadAction<any>) => {
      if (!state.answered) {
        state.answered = [];
      }
      if (action.payload === "RESET") {
        return initialState;
      }
      const index = action.payload - 1;
      if (index >= 0 && index >= state.answered.length) {
        const newLength = index + 1;
        state.answered = [
          ...state.answered,
          ...Array(newLength - state.answered.length).fill(false),
        ];
      }
      state.answered[index] = true;
    },

    setSelectAnswer: (state, action: PayloadAction<any>) => {
      state.selectedAnswer = action.payload;
    },

    setResponses: (state, action: PayloadAction<any>) => {
      state.responses = action.payload;
    },

    resetAnsweredQuestion: () => {
      return initialState;
    },
  },
});

export const {
  selectQuestion,
  answeredQuestion,
  resetAnsweredQuestion,
  setSelectAnswer,
  setResponses,
} = testSlice.actions;

export const selectSelectedQuestion = (state: RootState) =>
  state.test.selectedQuestion;
export const selectAnswered = (state: RootState) => state.test.answered;
export const selectSelectedAnswer = (state: RootState) =>
  state.test.selectedAnswer;
export const selectResponses = (state: RootState) => state.test.responses;

export default testSlice.reducer;
