import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = null as null | Task;

const editedTaskSlice = createSlice({
  name: "edit",
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

export const { actions } = editedTaskSlice;
export default editedTaskSlice.reducer;
