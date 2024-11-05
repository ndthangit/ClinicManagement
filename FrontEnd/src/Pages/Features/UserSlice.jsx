import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Axios from 'axios'

export const fetchAccountID = createAsyncThunk(
    'users/fetchByAccountID',
    async (AccountID) => {
        const response = await Axios.get(`http://localhost:3005/users/account/${AccountID}`)
        return response.data
    },
)

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isLoading: false,
    isError: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState: initialState, // phần này cần kiểm tra
    reducers: {
        loginStarted: (state) => {
            state.isLoading = true;
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.isError = false;
            localStorage.setItem('user', JSON.stringify(action.payload)); // Lưu vào localStorage
        },
        loginFailed: (state) => {
            state.isLoading = false;
            state.isError = true;
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('user');
        },


    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed

        builder.addCase(fetchAccountID.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        });

        builder.addCase(fetchAccountID.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.isError = false;
        });

        builder.addCase(fetchAccountID.rejected, (state, action) => {
            // Add user to the state array
            state.isLoading = false;
            state.isError = true;
        });
    },
});

export const { loginStarted, loginSuccess,loginFailed,logout  } = userSlice.actions;
export default userSlice.reducer;