import { FC, FormEvent } from "react";
import { Link, Location, useLocation, useNavigate } from "react-router-dom";

import { CopyRight, useAppDispatch } from "../../../../App";
import logoPng from "../../../../assets/images/logo.png";
import {
    BasicValidators, Control, ControlGroup, InputText, useControl, useControlGroup
} from "../../../../Ui/Forms";
import { authActions } from "../../../shared";
import classes from "./LoginView.module.scss";


type State = {
    from?: Location;
}

const LoginView: FC = () => {

    //#region Hooks
    const navigate = useNavigate();
    const location = useLocation() as Location & { state?: State };
    const appDispatch = useAppDispatch();
    //#endregion

    //#region Controls
    const loginForm: ControlGroup = useControlGroup({
        email: useControl("", [
            BasicValidators.required(),
            BasicValidators.email()
        ]),
        password: useControl("", [
                BasicValidators.required()
        ]),
        company: useControl("", [
            BasicValidators.required()
        ])
    });
    //#endregion

    //#region Event Handlers
    const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log(loginForm.isValid);

        if (!loginForm.isValid) {
            return;
        }

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
        <section>
            <article className={classes.loginView}>
                <header className={classes.header}>
                    <img src={logoPng} alt="Enterprize ERP" />
                </header>

                <form className="mgt3" noValidate
                      onSubmit={submitHandler}>
                    <h5 className="large text-align-center">Login</h5>

                    <InputText label="E-mail" name="email" size="large" type="email"
                               required
                               control={loginForm.controls.email as Control<string>}
                               errorMessages={{
                                   required: "E-mail é requerido.",
                                   email: "O E-mail informado não é válido."
                               }} />

                    <InputText label="Password" name="password" size="large" type="password"
                               required
                               control={loginForm.controls.password as Control<string>}
                               errorMessages={{
                                   required: "Senha é requerido."
                               }} />

                    <InputText label="Empresa" name="company" size="large"
                               required
                               control={loginForm.controls.company as Control<string>}
                               errorMessages={{
                                   required: "Empresa é requerido."
                               }} />

                    <button type="submit" className="large block mgt3">Login</button>

                    <div className="text-align-center">
                        <div className="mgt1">
                            <Link to="../../recover-password">Esqueci minha senha</Link>
                        </div>

                        <div className="mgt1">
                            Não possui conta? <a href="https://www.google.com/">Criar conta</a>
                        </div>
                    </div>

                </form>
            </article>

            <footer className={`${classes.footer} mgb1 mgr1`}>
                <CopyRight />
            </footer>
        </section>
    );
    //#endregion
};

export default LoginView;
