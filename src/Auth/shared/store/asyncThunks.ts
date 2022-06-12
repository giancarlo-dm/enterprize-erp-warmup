import { createAsyncThunk } from "@reduxjs/toolkit";

import { User } from "../models";
import { AuthService } from "../services";

export class AuthAsyncThunks {

    static login = createAsyncThunk<User, {username: string, password: string}>(
        "auth/login",
        async ({username, password}, thunkApi) => {
            try {
                return await AuthService.login(username, password);
            }
            catch (e: any) {
                return thunkApi.rejectWithValue({message: e.message});
            }
        }
    );

    static logout = createAsyncThunk(
        "auth/logout",
        async () => {
            await AuthService.logout();
        }
    );
}
