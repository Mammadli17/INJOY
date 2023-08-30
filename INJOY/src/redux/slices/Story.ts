import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchStory = createAsyncThunk('user/fetchStory', async () => {
  const response = await axios.get('http://192.168.100.31:8080/api/user/getAllStory');
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchStory.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export const Story  =  userSlice.reducer;
