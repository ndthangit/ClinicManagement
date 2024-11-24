import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Axios from 'axios'

export const fetchDoctors = createAsyncThunk(
    'users/fetchByDoctors',
    async (AccDoctorID) => {
        const response = await Axios.get(`http://localhost:3005/doctors/account/${AccDoctorID}`)
        return response.data
    },
)

const initialState = {
    user: JSON.parse(localStorage.getItem('doctor')) || null,
    isLoading: false,
    isError: false,
};

export const doctorSlice = createSlice({
    name: "doctors",
    initialState,
    reducers: {
        loginDoctorStarted: (state) => {
            state.isLoading = true;
        },
        loginDoctorSuccess: (state, action) => {
            state.isLoading = false;
            delete action.payload.message;
            state.user = action.payload;
            state.isError = false;
            localStorage.setItem('doctor', JSON.stringify(action.payload)); // Lưu vào localStorage
        },
        loginDoctorFailed: (state) => {
            state.isLoading = false;
            state.isError = true;
        },
        logoutDoctor: (state) => {
            state.user = null;
            localStorage.removeItem('doctor');
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchDoctors.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        });

        builder.addCase(fetchDoctors.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.isError = false;
        });

        builder.addCase(fetchDoctors.rejected, (state, action) => {
            // Add user to the state array
            state.isLoading = false;
            state.isError = true;
        });
    },
});


export const { loginDoctorStarted, loginDoctorSuccess, loginDoctorFailed, logoutDoctor  } = doctorSlice.actions;

export default doctorSlice.reducer;