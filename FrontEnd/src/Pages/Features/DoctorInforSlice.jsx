import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch doctor information
export const fetchDoctorInfo = createAsyncThunk('doctorInfo/fetchDoctorInfo', async () => {
    const response = await axios.get('http://localhost:3005/users/doctors');
    return response.data;
});

const initialState = {
    doctorInfo: [],
    isLoading: false,
    isError: false,
};

const doctorInfoSlice = createSlice({
    name: 'doctorInfo',
    initialState,
    reducers: {
        handleLogoutDoctorInfo:(state) => {
            state.doctorInfo = [];
            state.isLoading = false;
            state.isError = false;

        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDoctorInfo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchDoctorInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.doctorInfo = action.payload;
            })
            .addCase(fetchDoctorInfo.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })

    },
});
export const { handleLogoutDoctorInfo } = doctorInfoSlice.actions;

export default doctorInfoSlice.reducer;