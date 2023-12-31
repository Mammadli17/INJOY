import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchLikes = createAsyncThunk('user/fetchLikes', async () => {
  const response = await axios.get('https://injoybackend.onrender.com/api/user/getAllLikes');
  return response.data;
});

const userSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLikes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLikes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchLikes.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export const Like  =  userSlice.reducer;
