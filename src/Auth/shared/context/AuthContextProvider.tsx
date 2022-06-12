import { FC, useState } from "react";
import { Auth } from "./auth.interface";
import { AuthContext } from "./AuthContext";

type Props = {
    children: JSX.Element
}

export const AuthContextProvider: FC<Props> = (props) => {

    const [user, setUser] = useState<string|null>(null);

    const signIn = async (user: string, password: string) => {
        setUser(user);
    };

    const signOut = async () => {
        setUser(null);
    };

    const authData: Auth = {
        loggedIn: user != null,
        user: user,
        signIn: signIn,
        signOut: signOut
    };

    return (
        <AuthContext.Provider value={authData}>
            {props.children}
        </AuthContext.Provider>
    );
};
