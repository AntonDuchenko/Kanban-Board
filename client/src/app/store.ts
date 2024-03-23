import { configureStore } from "@reduxjs/toolkit";
import choosedTaskReducer from "../features/choosedTaskSlice";
import editedTaskReducer from "../features/editedTask";

export const store = configureStore({
  reducer: {
    choosedTask: choosedTaskReducer,
    editedTask: editedTaskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
