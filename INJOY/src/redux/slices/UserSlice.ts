import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';


interface UserState {
  data: any;
  loading: 'rejected' | 'pending' | 'fulfilled' | null;
  error: any;
}

const initialState: UserState = {
  data: null,
  loading: null,
  error: null,
};

export const fetchUser = createAsyncThunk('user/fetchUser', async (payload: any) => {
  const response = await axios.post<any>("https://injoybackend.onrender.com/api/user/getuser", payload);
  
  return response.data;

  
});


const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = 'fulfilled';
        state.data = action.payload;
        (action.payload , " action");
        
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error;
      });
  },
});

export const userReducer = userSlice.reducer;
