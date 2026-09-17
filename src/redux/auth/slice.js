import { createSlice } from '@reduxjs/toolkit';

import { fetchCurrentUser, refreshTokens, registerUser } from './operations';

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  refreshToken: null,
  isLoggedIn: false,
  isLoading: false,
  isRefreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  extraReducers: (builder) => {
    builder

      .addCase(refreshTokens.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
      })

      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
        };
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload ||
          action.error.message ||
          'Registration failed. Try again.';
      })

      // Получение текущего пользователя
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
        };
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.isLoggedIn = false;
        state.error =
          action.payload ||
          action.error.message ||
          'Unable to load current user';
      });
  },
});

export const authReducer = authSlice.reducer;
