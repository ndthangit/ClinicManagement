import {configureStore, createActionCreatorInvariantMiddleware, Tuple} from '@reduxjs/toolkit';
import rootReducer from "./reducers";
import paymentReducer from "../Pages/Features/PaymentSclice"
import appointmentReducer from "../Pages/Features/AppointmentSlice"

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        // Ignore write errors
    }
};

const preloadedState = loadState();

const store = configureStore({
    reducer: {
        user: rootReducer,
        payment: paymentReducer,
        appointment: appointmentReducer,


    },
    preloadedState,
    // middleware: () => new Tuple(actionCreatorMiddleware),
});

store.subscribe(() => {
    saveState(store.getState());
});
export default store;

