import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBoards } from "../api/statuses";

interface InitialState {
  boards: Board[];
  loading: boolean,
  error: string,
}

const initialState: InitialState = {
  boards: [],
  loading: true,
  error: "",
};

const BoardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.boards = action.payload;
      state.loading = false;
    });
    builder.addCase(init.rejected, (state) => {
      state.loading = false;
      state.error = "error";
    });
  },
});

export default BoardsSlice.reducer;

export const init = createAsyncThunk("boards/fetch", async () => {
  return await getBoards();
});
