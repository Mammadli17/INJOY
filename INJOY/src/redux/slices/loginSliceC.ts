import { createSlice } from '@reduxjs/toolkit'

interface LoginState {
    value: boolean
}

const initialState: LoginState = {
    value: false,
}


export const loginSliceC = createSlice({
    name:'loginSlice',
    initialState:initialState,
    reducers: {
        login:(state) => {
            state.value = true;
        },
        signout:(state) => {
            state.value = false
        }
    }
})


export const { login, signout } = loginSliceC.actions

export const LoginSliceC = loginSliceC.reducer

