import { createSlice } from '@reduxjs/toolkit';

// Redux Toolkit으로 코드 간소화
// 유저 정보 저장
const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: null,
    token: null,
    role: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    clearUser: (state) => {
      state.username = null;
      state.token = null;
      state.role = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
