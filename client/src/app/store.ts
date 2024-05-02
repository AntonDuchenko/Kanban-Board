import { configureStore } from "@reduxjs/toolkit";
import choosedTaskReducer from "../features/choosedTaskSlice";
import editedTaskReducer from "../features/editedTaskSlice";
import statusesSlice from "../features/statusesSlice";
import boardsSlice from '../features/boardsSlice';

export const store = configureStore({
  reducer: {
    choosedTask: choosedTaskReducer,
    editedTask: editedTaskReducer,
    statuses: statusesSlice,
    boards: boardsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
