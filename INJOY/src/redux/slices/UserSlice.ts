import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
}

interface GetUserRequest {
  id: string;
}

interface GetUserResponse {
  user: User;
}

interface UserState {
  data: User | null;
  loading: 'rejected' | 'pending' | 'fulfilled' | null;
  error: any;
}

const initialState: UserState = {
  data: null,
  loading: null,
  error: null,
};

export const fetchUser = createAsyncThunk('user/fetchUser', async (reqData: GetUserRequest) => {
  const response = await axios.post<GetUserResponse>("http://192.168.100.27:8080/api/user/getuser", reqData);
  return response.data.user;
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
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = 'fulfilled';
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error;
      });
  },
});

export const userReducer = userSlice.reducer;
