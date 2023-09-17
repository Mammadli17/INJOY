import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchComments = createAsyncThunk('user/fetchComments', async () => {
  const response = await axios.get('http://192.168.1.88:8080/api/user/getAllComments');
  return response.data;
});

const userSlice = createSlice({
  name: 'Comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export const Comment  =  userSlice.reducer;

