import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  token: string | null;
  name: string;
  email: string;
};

const initialState: UserState = {
  token: null,
  name: '',
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    clearUser(state) {
      state.token = null;
      state.name = '';
      state.email = '';
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
