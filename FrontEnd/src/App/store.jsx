import {configureStore, createActionCreatorInvariantMiddleware, Tuple} from '@reduxjs/toolkit';
import rootReducer from "./reducers";
import paymentReducer from "../Pages/Features/PaymentSclice"
import appointmentReducer from "../Pages/Features/AppointmentSlice"
const store = configureStore({
    reducer: {
        user: rootReducer,
        payment: paymentReducer,
        appointment: appointmentReducer,

    },
    // middleware: () => new Tuple(actionCreatorMiddleware),
});
export default store;