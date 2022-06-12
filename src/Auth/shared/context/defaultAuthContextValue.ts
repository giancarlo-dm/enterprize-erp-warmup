import { Auth } from "./auth.interface";

export const defaultAuthContextValue: Auth = {
    loggedIn: false,
    user: null,
    signIn: () => Promise.resolve(),
    signOut: () => Promise.resolve()
};
