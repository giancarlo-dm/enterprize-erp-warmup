import { FC } from "react";
import { Navigate } from "react-router-dom";

import { useAuthSlice } from "../store";

type Props = {
    children: JSX.Element
}

export const AlreadyLoggedInGuard: FC<Props> = (props) => {

    const authState = useAuthSlice();

    //#region Render
    if (authState.loggedIn) {
        return <Navigate to="/" replace />;
    }
    else {
        return props.children;
    }
    //#endregion
};
