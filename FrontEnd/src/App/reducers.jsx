import {combineReducers} from "@reduxjs/toolkit";
import {userSlice} from "../Pages/Features/UserSlice";
import {doctorSlice} from "../Pages/Features/DoctorSlice";

const rootReducer = combineReducers({
    patient: userSlice.reducer,
    doctor: doctorSlice.reducer
});

export default rootReducer


