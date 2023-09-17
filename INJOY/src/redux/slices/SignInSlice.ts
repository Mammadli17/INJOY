import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';

interface SignIn {
  data: any[];
  loading: 'rejected' | 'pending' | 'fulfilled' | null;
  error: any;
}

const initialState: SignIn = {
  data: [],
  loading: null,
  error: null,
};

export const postSign= createAsyncThunk('todos/postTodo', async (payload: any) => {
  const response = await axios.post("https://injoybackend.onrender.com/api/user/login", payload);
  (response.data);
  
  return response.data;

  
});




const SignInSlice= createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(postSign.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(postSign.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.data.push(action.payload);
      })
     
  },
});

export const SignIn = SignInSlice.reducer;