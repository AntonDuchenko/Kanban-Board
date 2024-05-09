import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBoardsByUserId } from "../api/boards";

interface InitialBoards {
  boards: Status[];
  activeBoard: Board | null;
  loading: boolean;
  error: string;
}

const active_board = localStorage.getItem("active_board");

const InitialState: InitialBoards = {
  boards: [],
  activeBoard: active_board ? JSON.parse(active_board) : null,
  loading: true,
  error: "",
};

const BoardsSlice = createSlice({
  name: "boards",
  initialState: InitialState,
  reducers: {
    setActiveBoard: (state, action) => {
      state.activeBoard = action.payload;

      localStorage.setItem("active_board", JSON.stringify(action.payload));
    },
    removeActiveBoard: (state) => {
      state.activeBoard = null;
    }
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

export const { setActiveBoard, removeActiveBoard } = BoardsSlice.actions;
export default BoardsSlice.reducer;

export const init = createAsyncThunk("boards/fetch", async (userId: number) => {
  return await getBoardsByUserId(userId);
});
