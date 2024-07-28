import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async actions
export const login = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
  try {
    const response = await axios.post('http://localhost:5000/api/user/login', { email, password });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message); // Extract the message part
  }
});

export const signup = createAsyncThunk('auth/signup', async ({ name, email, password }, thunkAPI) => {
  try {
    const response = await axios.post('http://localhost:5000/api/user/signup', { name, email, password });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message); // Extract the message part
  }
});

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
    successMessage: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.status = 'idle';
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.user = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload; // payload is a string now
      })
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.user = payload.data;
        state.successMessage = payload.message;
      })
      .addCase(signup.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload; // payload is a string now
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
