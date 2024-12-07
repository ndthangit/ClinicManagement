import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
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
    showAddForm: false,
};

const doctorInfoSlice = createSlice({
    name: 'doctorInfo',
    initialState,
    reducers: {

        updateDoctorUI: (state, action) => {
            const index = state.doctorInfo.findIndex(doctor => doctor.doctor_id === action.payload.doctor_id);
            if (index !== -1) {
                state.doctorInfo[index] = action.payload;
            }
            console.log("Updated doctor info: ", state.doctorInfo[index]);
        },
        updateInfoDoctor: (state, action) => {
            // console.log("accepted",action.payload);
            axios.patch('http://localhost:3005/doctor/update-doctor', action.payload).then((response) => {
                if (response.status === 200) {
                    console.log("res: ", response.data);
                }

            }).catch((error) => {
                console.log(error);
            })
        },
        showFormAddDoctor : (state) => {
            state.showAddForm = !state.showAddForm;
        },

        deleteDoctor: (state, action) =>{
            console.log("res dele : ",action.payload);

            axios.delete(`http://localhost:3005/doctor/delete-doctor/${action.payload.doctor_id}`).then((response) => {
                if (response.status === 200) {
                    console.log("res: ", response.data);
                }
            }).catch((error) => {
                console.log(error);
            })
        },

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
export const {updateInfoDoctor, updateDoctorUI,showFormAddDoctor, deleteDoctor} = doctorInfoSlice.actions;

export default doctorInfoSlice.reducer;