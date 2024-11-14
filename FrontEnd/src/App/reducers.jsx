import {combineReducers} from "@reduxjs/toolkit";
import {userSlice} from "../Pages/Features/UserSlice";
import {doctorSlice} from "../Pages/Features/DoctorSlice";
import {adminSlice} from "../Pages/Features/AdminSlice";

const rootReducer = combineReducers({
    patient: userSlice.reducer,
    doctor: doctorSlice.reducer,
    admin: adminSlice.reducer,
});

export default rootReducer


