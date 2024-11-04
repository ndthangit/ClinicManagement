import {combineReducers} from "@reduxjs/toolkit";
import {userSlice} from "../Pages/Features/UserSlice";

const rootReducer = combineReducers({
    user: userSlice.reducer,
});

export default rootReducer


