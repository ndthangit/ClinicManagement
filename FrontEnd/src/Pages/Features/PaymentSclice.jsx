import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from 'axios';
import {loginAdminFailed, loginAdminSuccess} from "./AdminSlice";
import {fetchAppointments} from "./AppointmentSlice";

export const fetchPayments = createAsyncThunk(
    'payments/fetchPayments',
    async () => {
        const response = await Axios.get(`http://localhost:3005/users/payments`);
        return response.data;
    },
);

const initialState = {
    payments: [],
    isLoading: false,
    isError: false,
};

export const paymentSlice = createSlice({
    name: "payments",
    initialState,
    reducers: {
        updateUIPaymentStatus: (state, action) => {
            state.payments = state.payments.map((payment) => {
                if (payment.payment_id === action.payload.paymentId) {
                    payment.status = action.payload.status;
                }
                return payment;
            });
        },
        updatePaymentStatus: (state, action) => {

            Axios.patch('http://localhost:3005/admin/updateStatusPayment', action.payload)
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
        },


    },
    extraReducers: (builder) => {
        builder.addCase(fetchPayments.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });

        builder.addCase(fetchPayments.fulfilled, (state, action) => {
            state.payments = action.payload;
            state.isLoading = false;
            state.isError = false;
        });

        builder.addCase(fetchPayments.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });

    },
});
export const { updatePaymentStatus,updateUIPaymentStatus } = paymentSlice.actions;
export default paymentSlice.reducer;