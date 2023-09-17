import { configureStore } from "@reduxjs/toolkit";
import { Login } from "./slices/LoginSlice";
import { LoginSliceC } from "./slices/loginSliceC";
import { SignIn } from "./slices/SignInSlice";
import { userReducer } from "./slices/UserSlice";
import { Post } from "./slices/PostSlice";
import { postReducer } from "./slices/UserPost";
import { Like } from "./slices/Like";
import { Comment } from "./slices/Comment";
import { Follow } from "./slices/Follow";
import { Users } from "./slices/User";
import { Story } from "./slices/Story";
import { Chats } from "./slices/Chats";


export const store = configureStore({
  reducer: {
    LoginSlice: Login,
    login: LoginSliceC,
    SignIn: SignIn,
    User: userReducer,
    AllPost: Post,
    UserPost: postReducer,
    AllLikes: Like,
    AllComment: Comment,
    AllFollows:Follow,
    AllUsers:Users,
    AllStory:Story,
    AllChats:Chats


  },
});

export type AppDispatch = typeof store.dispatch;
export type StateType = ReturnType<typeof store.getState>;