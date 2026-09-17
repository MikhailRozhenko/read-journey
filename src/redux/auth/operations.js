import { createAsyncThunk } from '@reduxjs/toolkit';

import { api, setAuthHeader } from '../../services/api';

export const registerUser = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post('/users/signup', credentials);
      setAuthHeader(data.token);

      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Registration failed. Try again.';

      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const refreshTokens = createAsyncThunk(
  'auth/refreshTokens',
  async (_, thunkAPI) => {
    const refreshToken = thunkAPI.getState().auth.refreshToken;

    if (!refreshToken) {
      return thunkAPI.rejectWithValue('No refresh token');
    }

    try {
      const { data } = await api.get('/users/current/refresh', {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      setAuthHeader(data.token);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Unable to refresh session',
      );
    }
  },
);

let refreshPromise = null;

const refreshTokensOnce = (dispatch) => {
  if (!refreshPromise) {
    refreshPromise = dispatch(refreshTokens())
      .unwrap()
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue('No access token');
    }

    try {
      setAuthHeader(token);

      const { data } = await api.get('/users/current');

      return data;
    } catch (error) {
      if (error.response?.status !== 401) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message || 'Unable to load current user',
        );
      }

      try {
        const currentToken = thunkAPI.getState().auth.token;

        if (currentToken === token) {
          await refreshTokensOnce(thunkAPI.dispatch);
        }

        const newToken = thunkAPI.getState().auth.token;
        setAuthHeader(newToken);

        const { data } = await api.get('/users/current');

        return data;
      } catch (retryError) {
        const message =
          typeof retryError === 'string'
            ? retryError
            : retryError.response?.data?.message || 'Unable to restore session';

        return thunkAPI.rejectWithValue(message);
      }
    }
  },
);
