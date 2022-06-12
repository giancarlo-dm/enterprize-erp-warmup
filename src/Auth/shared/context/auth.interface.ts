export interface Auth {
    loggedIn: boolean;
    user: string|null;
    signIn: (user: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}
