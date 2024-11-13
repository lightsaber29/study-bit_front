import { createSlice } from '@reduxjs/toolkit';

// Redux Toolkit으로 코드 간소화
// 유저 정보 저장
const userSlice = createSlice({
  name: 'user',
  initialState: {
    memberId: null,
    email: null,
    role: null,
    nickName: null,
    token: null
  },
  reducers: {
    setUser: (state, action) => {
      state.memberId = action.payload.memberId;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.nickName = action.payload.nickName;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.memberId = null;
      state.email = null;
      state.role = null;
      state.nickName = null;
      state.token = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
