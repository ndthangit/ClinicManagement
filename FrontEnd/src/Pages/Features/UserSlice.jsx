import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


const initialState = {
    user: JSON.parse(localStorage.getItem('patient')) || null,
    isLoading: false,
    isError: false,
};

export const userSlice = createSlice({
    name: "patient",
    initialState: initialState, // phần này cần kiểm tra
    reducers: {
        loginStarted: (state) => {
            state.isLoading = true;
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            delete action.payload.message;
            state.user = action.payload;

            state.isError = false;
            localStorage.setItem('patient', JSON.stringify(action.payload)); // Lưu vào localStorage
        },
        loginFailed: (state) => {
            state.isLoading = false;
            state.isError = true;
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('patient');
        },


    },

});

export const { loginStarted, loginSuccess,loginFailed,logout  } = userSlice.actions;
export default userSlice.reducer;