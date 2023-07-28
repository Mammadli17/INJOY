  import { configureStore } from "@reduxjs/toolkit";
  import { Login } from "./slices/LoginSlice";
  import { LoginSliceC } from "./slices/loginSliceC";
import { SignIn } from "./slices/SignInSlice";
import { userReducer } from "./slices/UserSlice";


  export const store = configureStore({
    reducer: {
    LoginSlice:Login,
    login: LoginSliceC,
    SignIn:SignIn,
    User: userReducer
    },
  });

  export type AppDispatch = typeof store.dispatch;
  export type StateType = ReturnType<typeof store.getState>;