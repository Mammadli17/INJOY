import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';


interface PostState {
  data: any;
  loading: 'rejected' | 'pending' | 'fulfilled' | null;
  error: any;
}

const initialState: PostState = {
  data: null,
  loading: null,
  error: null,
};

export const fetchUserPost = createAsyncThunk('post/fetchPost', async (payload: any) => {
    console.log(payload);
    
  const response = await axios.post<any>("http://192.168.100.31:8080/api/user/getpostId", payload);
  console.log(response.data,"responses");
  
  return response.data;

  
});


const postSlice = createSlice({
  name: 'post',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPost.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchUserPost.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = 'fulfilled';
        state.data = action.payload;
        console.log(action.payload , " action");
        
      })
      .addCase(fetchUserPost.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error;
      });
  },
});

export const postReducer = postSlice.reducer;
