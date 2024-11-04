import {configureStore, createActionCreatorInvariantMiddleware, Tuple} from '@reduxjs/toolkit';
import rootReducer from "./reducers";
import doctorReducer from '../Pages/Features/DoctorSlice'
import medicineReducer from '../Pages/Features/MedicineSlice'
const store = configureStore({
    reducer: {
        user: rootReducer,
        doctor: doctorReducer,
        medicine : medicineReducer,
    },
    // middleware: () => new Tuple(actionCreatorMiddleware),
});
export default store;