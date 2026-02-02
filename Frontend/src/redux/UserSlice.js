import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import React from 'react'

export const fecthUser = createAsyncThunk(
    'user/fecthUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const res = await fetch('https://trello-backend-v4qh.onrender.com/api/auth/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email, password
                })
            });
            const data = await res.json();
            if (!res.ok) return rejectWithValue(data.message);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        loading: false,
        error: null,
        authChecked: false
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.authChecked = true;
        },
        logout: (state) => {
            state.user = null;
            state.authChecked = true;
            localStorage.removeItem("user");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fecthUser.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(fecthUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(fecthUser.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })
    }
})

export const { logout,setUser } = userSlice.actions
export default userSlice.reducer;