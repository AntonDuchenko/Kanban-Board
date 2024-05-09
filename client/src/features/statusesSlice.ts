import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getStatusesByBoardId } from "../api/statuses";

interface InitialState {
  statuses: Status[];
  loading: boolean,
  error: string,
}

const initialState: InitialState = {
  statuses: [],
  loading: true,
  error: "",
};

const StatusesSlice = createSlice({
  name: "statuses",
  initialState,
  reducers: {
    removeStatuses: (state) => {
      state.statuses = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.statuses = action.payload;
      state.loading = false;
    });
    builder.addCase(init.rejected, (state) => {
      state.loading = false;
      state.error = "error";
    });
  },
});

export const { removeStatuses } = StatusesSlice.actions;

export default StatusesSlice.reducer;

export const init = createAsyncThunk("statuses/fetch", async (id: number) => {
  return await getStatusesByBoardId(id);
});
