import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {backendApi} from "../api";
import type {EnrollmentsCollectionData} from "../model/EnrollmentCollectionData";

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

export const getEnrollmentsByUserId = createAsyncThunk(
    'enrollments/getByUserId',
    async (userId: number) => {
        console.log("Fetching enrollments for user ID:", userId);
        const response = await backendApi.get(`/api/enrollments/user/${userId}`);
        return response.data as EnrollmentsCollectionData[];
    }
);



const enrollmentSlice = createSlice({
    name: "EnrollmentsCollection",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getEnrollmentsByUserId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getEnrollmentsByUserId.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(getEnrollmentsByUserId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Unknown error";
                alert("Error loading: " + state.error);
            });
    },
});


export default enrollmentSlice.reducer;
