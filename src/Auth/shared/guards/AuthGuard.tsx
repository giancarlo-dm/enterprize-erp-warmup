import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuthSlice } from "../store";

type Props = {
    children: JSX.Element
}

export const AuthGuard: FC<Props> = (props) => {

    const authState = useAuthSlice();
    const location = useLocation();

    //#region Render
    if (!authState.loggedIn) {
        return <Navigate to="/auth/login" state={{from: location}} replace />;
    }
    else {
        return props.children;
    }
    //#endregion
};
