import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchChats = createAsyncThunk('user/fetchChats', async () => {
  const response = await axios.get('http://192.168.1.88:8080/api/user/getAllMessages');
  return response.data;
});

const userSlice = createSlice({
  name: 'Chats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export const Chats  =  userSlice.reducer;
