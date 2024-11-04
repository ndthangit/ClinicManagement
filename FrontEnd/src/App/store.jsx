import {configureStore, createActionCreatorInvariantMiddleware, Tuple} from '@reduxjs/toolkit';
import rootReducer from "./reducers";

const isActionCreator = (action) =>
    typeof action === 'function' && 'type' in action

const actionCreatorMiddleware = createActionCreatorInvariantMiddleware({
    isActionCreator,
})

const store = configureStore({
    reducer: { user: rootReducer },
    // middleware: () => new Tuple(actionCreatorMiddleware),
});
export default store;