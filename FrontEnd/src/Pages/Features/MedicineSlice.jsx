import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from 'axios';

// AsyncThunk to fetch medicines
export const fetchMedicines = createAsyncThunk(
    'medicines/fetchByMedicines',
    async () => {
        const response = await Axios.get(`http://localhost:3005/users/medicines`);
        return response.data;
    },
);

const initialState = {
    medicines: [],
    isLoading: false,
    isError: false,
};

// Slice to handle medicines data
export const medicineSlice = createSlice({
    name: "medicines",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMedicines.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });

        builder.addCase(fetchMedicines.fulfilled, (state, action) => {
            state.medicines = action.payload;
            state.isLoading = false;
            state.isError = false;
        });

        builder.addCase(fetchMedicines.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });
    },
});

export default medicineSlice.reducer;