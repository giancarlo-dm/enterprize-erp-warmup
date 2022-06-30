import { createAsyncThunk } from "@reduxjs/toolkit";

import { User } from "../models";
import { AuthService } from "../services";

export class AuthAsyncThunks {

    static login = createAsyncThunk<User, {email: string, password: string, company: string}>(
        "auth/login",
        async ({email, password, company}, thunkApi) => {
            try {
                return await AuthService.login(email, password, company);
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
