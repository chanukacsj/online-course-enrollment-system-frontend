import {combineReducers} from "redux";
import courseReducer from "./courseSlice.ts";
import enrollmentReducer from "./courseEnrollmentSlice.ts";

export const rootReducer = combineReducers({
    course: courseReducer,
    enrollmentCollection: enrollmentReducer

});
export type RootReducerState = ReturnType<typeof rootReducer>