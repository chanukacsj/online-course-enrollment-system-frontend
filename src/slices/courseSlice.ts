import type {CourseData} from "../model/CourseData.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {backendApi} from "../api.ts";

interface CourseState{
    list: CourseData[],
    error: string | null | undefined
}
const intialState: CourseState = {
    list: [],
    error: null
}

export const getAllCourses = createAsyncThunk (
    'courses/getAllCourses',
    async () => {
        const response = await backendApi.get("api/courses/all");
        return await response.data;
    }
)

const courseSlice = createSlice({
    name: "courses",
    initialState: intialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.pending, () => {
            alert("Courses are still loading..");
        }).addCase(getAllCourses.fulfilled, (state, action) => {
            state.list = action.payload;
        }).addCase(getAllCourses.rejected, (state, action) => {
            state.error = action.error.message;
            alert("Error loading: " + state.error);
        })
    }
})
export default courseSlice.reducer;