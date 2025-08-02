import type {UserData} from "../model/UserData.ts";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {backendApi} from "../api.ts";

interface UserState{
    list: UserData[];
    error: string | null | undefined;
}
const initialState: UserState = {
    list: [],
    error: null
}
export const getAllUsers = createAsyncThunk(
    'users/getAllUsers',
    async () => {
        const response = await backendApi.get("api/users/all");
        return await response.data;
    }
)

const userSlice = createSlice({
    name: "users",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllUsers.pending, () => {
            console.log("Fetching all users...");
        }).addCase(getAllUsers.fulfilled, (state, action) => {
            state.list = action.payload;
        }).addCase(getAllUsers.rejected, (state, action) => {
            state.error = action.error.message;
            console.error("Failed to fetch users:", action.error.message);
        });
    }
})
export default userSlice.reducer;