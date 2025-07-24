import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {backendApi} from "../api.ts";
import type {EnrollmentsCollectionData} from "../model/EnrollmentCollectionData.ts";

interface EnrollmentState {
    list: EnrollmentsCollectionData[],
    error: string | null | undefined
}
const intialState: EnrollmentState = {
    list: [],
    error: null
}

export const getEnrollmentsByUserId = createAsyncThunk (
    '/user/:userId',
    async () => {
        const response = await backendApi.get("api/enrollments/user/:userId");
        return await response.data;
    }
)

const enrollmentSlice = createSlice({
    name: "EnrollmentsCollection",
    initialState: intialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getEnrollmentsByUserId.pending, () => {
            alert("EnrollmentsCollection are still loading..");
        }).addCase(getEnrollmentsByUserId.fulfilled, (state, action) => {
            state.list = action.payload;
        }).addCase(getEnrollmentsByUserId.rejected, (state, action) => {
            state.error = action.error.message;
            alert("Error loading: " + state.error);
        })
    }
})
export default enrollmentSlice.reducer;