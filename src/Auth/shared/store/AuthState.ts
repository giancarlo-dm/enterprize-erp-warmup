import { User } from "../models";

export interface AuthState {
    loggedIn: boolean;
    user: User|null;
}
