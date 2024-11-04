import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Axios from 'axios'

export const fetchDoctors = createAsyncThunk(
    'users/fetchByDoctors',
    async ( ) => {
        const response = await Axios.get(`http://localhost:3005/users/doctors`)
        return response.data
    },
)

const initialState = {
    doctor: [],
    isLoading: false,
    isError: false,
};

export const doctorSlice = createSlice({
    name: "doctors",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchDoctors.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        });

        builder.addCase(fetchDoctors.fulfilled, (state, action) => {
            state.doctor = action.payload;
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

export default doctorSlice.reducer;