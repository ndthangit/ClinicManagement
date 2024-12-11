import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch patient information
export const fetchPatientInfo = createAsyncThunk('patientInfo/fetchPatientInfo', async () => {
    const response = await axios.get('http://localhost:3005/users/patients');
    return response.data;
});

const initialState = {
    patientInfo: [],
    isLoading: false,
    isError: false,
};

const patientInfoSlice = createSlice({
    name: 'patientInfo',
    initialState,
    reducers: {
        handleLogoutPatientInfo: (state) => {
            state.patientInfo = [];
            state.isLoading = false;
            state.isError = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPatientInfo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchPatientInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.patientInfo = action.payload;
            })
            .addCase(fetchPatientInfo.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export const { handleLogoutPatientInfo } = patientInfoSlice.actions;

export default patientInfoSlice.reducer;