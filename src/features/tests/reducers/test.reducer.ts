import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TestState {
  selectedQuestion: number;
  answered: boolean[];
}

const initialState: TestState = {
  selectedQuestion: 1,
  answered: [],
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
    resetAnsweredQuestion: () => {
      return initialState;
    },
  },
});

export const { selectQuestion, answeredQuestion, resetAnsweredQuestion } =
  testSlice.actions;
export default testSlice.reducer;
