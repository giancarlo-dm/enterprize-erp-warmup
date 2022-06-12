import { FC, FormEvent, Fragment } from "react";
import { Location, useLocation, useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../../../App/store";
import { authActions } from "../../../shared";


interface State {
    from?: Location;
}

const LoginView: FC = () => {

    //#region Hooks
    const navigate = useNavigate();
    const location = useLocation() as Location & { state?: State };
    const appDispatch = useAppDispatch();
    //#endregion

    //#region Event Handlers
    const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await appDispatch(authActions.login({username: "Lorem", password: "Ipsum"})).unwrap();
            const to = location.state?.from?.pathname || "/";
            navigate(to, {replace: true});
        }
        catch (e: any) {
            alert(`Failed to login!\n\n${e.message}`);
        }
    };
    //#endregion

    //#region Render
    return (
        <Fragment>
            <h1>Hello from --&gt; LoginView!</h1>
            <form onSubmit={submitHandler} noValidate>
                <button type="submit">Login</button>
            </form>
        </Fragment>
    );
    //#endregion
};

export default LoginView;
