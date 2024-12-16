import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from 'axios';

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
export default paymentSlice.reducer;