import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { timeStampConvertation } from '../utils/timeStampConvertation';

interface initialState {
  user: User | null;
  isAuth: boolean;
  token: string | null;
}

const tokenLocal = localStorage.getItem("userToken");
const isValid = tokenLocal ? timeStampConvertation(tokenLocal) : false;

if (!isValid) {
  localStorage.removeItem("active_board");
}

const initialState: initialState = {
  user: isValid ? jwtDecode(tokenLocal!) : null,
  isAuth: isValid ? true : false,
  token: isValid ? tokenLocal : null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.user = action.payload.user;
      state.isAuth = true;
      state.token = action.payload.user.access_token;

      localStorage.setItem("userToken", state.token!);
    },
    setLogOut: (state) => {
      state.isAuth = false;
      state.user = null;
      state.token = null;
    }
  },
});

export const { setLogOut, setLoggedIn } = userSlice.actions;

export default userSlice.reducer;
