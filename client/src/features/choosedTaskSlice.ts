import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = null as null | Task;

const choosedTaskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTask: (_, action: PayloadAction<Task>) => {
      return action.payload
    },
    removeTask: () => {
      return null;
    },
  },
});

export const { actions } = choosedTaskSlice;
export default choosedTaskSlice.reducer;
