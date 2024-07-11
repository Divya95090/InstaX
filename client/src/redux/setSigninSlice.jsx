import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    opensi: false,
};

const SigninSlice = createSlice({
    name: 'Signin',
    initialState,
    reducers: {
        openSignin: (state) => {
            state.opensi = true;
        },
        closeSignin: (state) => {
            state.opensi = false;
        }
    }
});

export const { openSignin, closeSignin } = SigninSlice.actions;

export default SigninSlice.reducer;
