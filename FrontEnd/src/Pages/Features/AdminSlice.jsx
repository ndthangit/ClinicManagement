import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {userSlice} from "./UserSlice";

const initialState = {
    admin: null,
    isLoading: false,
    isError: false,
};

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        // Add reducers for additional action types here, and handle loading state as needed
        loginAdminStarted: (state) => {
            state.isLoading = true;
        },
        loginAdminSuccess: (state, action) => {
            state.isLoading = false;
            state.admin = action.payload;
            state.isError = false;
        },
        loginAdminFailed: (state) => {
            state.isLoading = false;
            state.isError = true;
        },
        logoutAdmin: (state) => {
            state.admin = null;
            state.isLoading = false;
            state.isError = false;
        },
    },

});
export const { loginAdminFailed,logoutAdmin,loginAdminStarted,loginAdminSuccess  } = adminSlice.actions;

export default adminSlice.reducer;