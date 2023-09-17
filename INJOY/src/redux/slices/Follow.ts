import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchFollows = createAsyncThunk('user/fetchFollows', async () => {
  const response = await axios.get('http://192.168.1.88:8080/api/user/getAllFollowers');
  return response.data;
});

const userSlice = createSlice({
  name: 'Follows',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFollows.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFollows.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchFollows.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export const Follow  =  userSlice.reducer;
