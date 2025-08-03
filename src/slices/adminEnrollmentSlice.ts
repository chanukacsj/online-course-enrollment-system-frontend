import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {backendApi} from "../api.ts";
import type {EnrollmentsCollectionData} from "../model/EnrollmentCollectionData.ts";

interface EnrollmentState {
    list: EnrollmentsCollectionData[];
    error: string | null;
    loading: boolean;
}

const initialState: EnrollmentState = {
    list: [],
    error: null,
    loading: false,
};

export const getAllEnrollments = createAsyncThunk(
    'enrollments/getAllEnrollments',
    async () => {
        const response = await backendApi.get("/api/enrollments/all");
        return response.data as EnrollmentsCollectionData[];
    }
);

const getAllEnrollmentSlice = createSlice({
    name: "EnrollmentsCollection",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllEnrollments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllEnrollments.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(getAllEnrollments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Unknown error";
                alert("Error loading: " + state.error);
            });
    },
});

export default getAllEnrollmentSlice.reducer;

