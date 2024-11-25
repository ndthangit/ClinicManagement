// `Pages/Features/AppointmentSlice.js`
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Axios from "axios";

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
    reducers: {
        updateUIAppointmentStatus: (state, action) => {
            state.appointments = state.appointments.map((appointment) => {
                if (appointment.appointment_id === action.payload.appointmentId) {
                    appointment.status = action.payload.status;
                }
                return appointment;
            });
        },
        updateAppointmentStatus: (state, action) => {
            Axios.patch('http://localhost:3005/admin/updateStatusAppointment', action.payload)
                .then((res) => {
                    if (res.data.message === 'updated successfully') {
                        console.log("Response from backend:", res.data.message);
                    } else {
                        console.log("Response from backend:", res.data);
                    }
                    console.log("Update successful");
                })
                .catch((error) => {
                    console.error('Error during the update request:', error);
                });

        }

    },
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
export const { updateUIAppointmentStatus,updateAppointmentStatus } = appointmentSlice.actions;

export default appointmentSlice.reducer;