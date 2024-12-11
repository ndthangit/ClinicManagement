import { configureStore, combineReducers } from '@reduxjs/toolkit';
import rootReducer from "./reducers";
import paymentReducer from "../Pages/Features/PaymentSclice";
import appointmentReducer from "../Pages/Features/AppointmentSlice";
import doctorInfoReducer from "../Pages/Features/DoctorInforSlice";
import patientInfoReducer from "../Pages/Features/PatientInforSlice";

// Load state from localStorage
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

// Save state to localStorage
const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        // Ignore write errors
    }
};

// Preloaded state from localStorage
const preloadedState = loadState();

// Combine all reducers
const appReducer = combineReducers({
    user: rootReducer,
    payment: paymentReducer,
    appointment: appointmentReducer,
    doctorInfo: doctorInfoReducer,
    patientInfo: patientInfoReducer,
});

// Root reducer with reset functionality
const rootReducerWithReset = (state, action) => {
    if (action.type === 'LOGOUT') {
        state = undefined; // Reset state to undefined
    }
    return appReducer(state, action);
};

// Configure the store
const store = configureStore({
    reducer: rootReducerWithReset,
    preloadedState,
});

// Subscribe to save state changes to localStorage
store.subscribe(() => {
    saveState(store.getState());
});

export default store;
