import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBoards } from "../api/boards";

interface InitialBoards {
  boards: Status[];
  activeBoard: Board | null;
  loading: boolean;
  error: string;
}

const InitialState: InitialBoards = {
  boards: [],
  activeBoard: null,
  loading: true,
  error: "",
};

const BoardsSlice = createSlice({
  name: "boards",
  initialState: InitialState,
  reducers: {
    setActiveBoard: (state, action) => {
      state.activeBoard = action.payload;
    },
  },
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

export const { setActiveBoard } = BoardsSlice.actions;
export default BoardsSlice.reducer;

export const init = createAsyncThunk("boards/fetch", async () => {
  return await getBoards();
});
