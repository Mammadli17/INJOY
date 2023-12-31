import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';

interface Login {
  data: any[];
  loading: 'rejected' | 'pending' | 'fulfilled' | null;
  error: any;
}

const initialState: Login = {
  data: [],
  loading: null,
  error: null,
};

export const postData= createAsyncThunk('todos/postTodo', async (payload: any) => {
 ("oks");
 
  
  const response = await axios.post("https://injoybackend.onrender.com/api/user/register", payload);

  (response.data);
  
  return response.data;

  
});




const LoginSlice= createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(postData.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(postData.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.data.push(action.payload);
      })
     
  },
});

export const Login = LoginSlice.reducer;