import { FC, FormEvent } from "react";
import { Link, Location, useLocation, useNavigate } from "react-router-dom";

import { CopyRight, useAppDispatch } from "../../../../App";
import logoPng from "../../../../assets/images/logo.png";
import { BasicValidators, Control, InputText, useControl } from "../../../../Ui/Forms";
import { authActions } from "../../../shared";
import classes from "./LoginView.module.scss";


interface State {
    from?: Location;
}

const LoginView: FC = () => {

    //#region Hooks
    const navigate = useNavigate();
    const location = useLocation() as Location & { state?: State };
    const appDispatch = useAppDispatch();
    //#endregion

    //#region Controls
    const emailControl: Control<string> = useControl(
        "",
        [
            BasicValidators.required(),
            BasicValidators.email()
        ]);
    const passwordControl: Control<string> = useControl(
        "",
        [
            BasicValidators.required()
        ]
    );
    const companyControl: Control<string> = useControl(
        "",
        [
            BasicValidators.required()
        ]
    );
    //#endregion

    //#region Event Handlers
    const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!emailControl.isValid) {
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

                <form className="mgt3" noValidate>
                    <h5 className="large text-align-center">Login</h5>

                    <InputText label="E-mail" name="email" size="large" type="email"
                               required
                               control={emailControl}
                               errorMessages={{
                                   required: "E-mail é requerido.",
                                   email: "O E-mail informado não é válido."
                               }} />

                    <InputText label="Password" name="password" size="large" type="password"
                               required
                               control={passwordControl}
                               errorMessages={{
                                   required: "Senha é requerido."
                               }} />

                    <InputText label="Empresa" name="company" size="large"
                               required
                               control={companyControl}
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
