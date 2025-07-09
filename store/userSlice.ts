// store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type UserState = {
  isLoggedIn: boolean
  token: string | null
  userInfo: {
    id: string
    name: string
    email: string
  } | null
}

const initialState: UserState = {
  isLoggedIn: false,
  token: null,
  userInfo: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        token: string
        userInfo: UserState['userInfo']
      }>
    ) => {
      state.isLoggedIn = true
      state.token = action.payload.token
      state.userInfo = action.payload.userInfo
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.token = null
      state.userInfo = null
    },
  },
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer
