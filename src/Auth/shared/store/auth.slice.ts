import { combineReducers, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { RootState, store } from "../../../App";
import { AuthAsyncThunks } from "./asyncThunks";
import { AuthState } from "./AuthState";

const defaultState: AuthState =  {
    loggedIn: false,
    user: null
};

const authSlice = createSlice({
    name: "auth",
    initialState: defaultState,
    reducers: {
    },
    extraReducers: builder => {
        // Login
        builder.addCase(AuthAsyncThunks.login.fulfilled, (state, {payload}) => {
            state.loggedIn = true;
            state.user = payload;
        });
        builder.addCase(AuthAsyncThunks.login.rejected, (state) => {
            state.loggedIn = false;
            state.user = null;
        });

        // Logout
        builder.addCase(AuthAsyncThunks.logout.fulfilled, (state) => {
            state.loggedIn = false;
            state.user = null;
        });
    }
});

// TODO this probably does not work. We need to inject a new reducer, see example on Toolkit site.
store.replaceReducer(combineReducers({auth: authSlice.reducer}) as any);

export const authActions = {
    ...authSlice.actions,
    login: AuthAsyncThunks.login,
    logout: AuthAsyncThunks.logout
};

export const useAuthSlice = () => useSelector<RootState, AuthState>(state => (state as any).auth);
