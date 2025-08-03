import {combineReducers} from "redux";
import courseReducer from "./courseSlice.ts";
import enrollmentReducer from "./courseEnrollmentSlice.ts";
import userReducer from "./usersSlice.ts";
import adminEnrollmentReducer from "./adminEnrollmentSlice.ts";

export const rootReducer = combineReducers({
    course: courseReducer,
    enrollmentCollection: enrollmentReducer,
    users: userReducer,
    adminEnrollment: adminEnrollmentReducer

});
export type RootReducerState = ReturnType<typeof rootReducer>