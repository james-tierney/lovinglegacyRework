import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProfileByUsername = createAsyncThunk("profile/fetchByUsername", async (username) => {
    console.log("fetching by username in redux ")
    const response = await axios.get('http://localhost:3002/userProfile', {
        params: {
            username: username
        }
    });
    return response.data;
});

export const fetchProfileByQrId = createAsyncThunk("profile/fetchByQrId", async (qr_id) => {
    console.log("fetching by qr_id in redux ")
    //const response = await axios.get('https://lovinglegacy.onrender.com/getProfile', {
    const response = await axios.get('http://localhost:3002/getProfile', {
    params: {
            qr_id: qr_id
        }
    });
    return response.data;
});

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        isLoading: false,
        data: null,
        error: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileByUsername.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProfileByUsername.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchProfileByUsername.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
            .addCase(fetchProfileByQrId.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProfileByQrId.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchProfileByQrId.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            });
    }
});

export default profileSlice.reducer;
