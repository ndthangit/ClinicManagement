// `Pages/Features/AppointmentSlice.js`
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch appointments
export const fetchAppointments = createAsyncThunk('appointments/fetchAppointments', async () => {
    const response = await axios.get('http://localhost:3005/admin/checkAppointment');
    return response.data;
});

// Async thunk to update appointment status


const initialState = {
    appointments: [],
    isLoading: false,
    isError: false,
};

const appointmentSlice = createSlice({
    name: 'appointments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAppointments.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAppointments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.appointments = action.payload;
            })
            .addCase(fetchAppointments.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })

    },
});

export default appointmentSlice.reducer;