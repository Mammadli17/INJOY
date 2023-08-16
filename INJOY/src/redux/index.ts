import { configureStore } from "@reduxjs/toolkit";
import { Login } from "./slices/LoginSlice";
import { LoginSliceC } from "./slices/loginSliceC";
import { SignIn } from "./slices/SignInSlice";
import { userReducer } from "./slices/UserSlice";
import { Post } from "./slices/PostSlice";
import { postReducer } from "./slices/UserPost";
import { Like } from "./slices/Like";
import { Comment } from "./slices/Comment";


export const store = configureStore({
  reducer: {
    LoginSlice: Login,
    login: LoginSliceC,
    SignIn: SignIn,
    User: userReducer,
    AllPost: Post,
    UserPost: postReducer,
    AllLikes: Like,
    AllComment: Comment

  },
});

export type AppDispatch = typeof store.dispatch;
export type StateType = ReturnType<typeof store.getState>;