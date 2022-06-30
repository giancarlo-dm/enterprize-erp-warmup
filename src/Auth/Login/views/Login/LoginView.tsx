import { FC, useState } from "react";
import { Link, Location, useLocation, useNavigate } from "react-router-dom";

import { CopyRight, useAppDispatch } from "../../../../App";
import logoPng from "../../../../assets/images/logo.png";
import {
    BasicValidators, Control, ControlGroup, Form, InputText, useControl, useControlGroup
} from "../../../../Ui/Forms";
import { Button } from "../../../../Ui/Layout";
import { If } from "../../../../Ui/Structural";
import { authActions } from "../../../shared";
import classes from "./LoginView.module.scss";


type State = {
    from?: Location;
}

const LoginView: FC = () => {

    //#region Initialization
    const navigate = useNavigate();
    const location = useLocation() as Location & { state?: State };
    const appDispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [hasLoginFailed, setHasLoginFailed] = useState(false);
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
    const submitHandler = async () => {

        if (!loginForm.isValid) {
            return;
        }

        setIsLoading(true);

        const email: string = (loginForm.controls.email as Control<string>).value;
        const password: string = (loginForm.controls.password as Control<string>).value;
        const company: string = (loginForm.controls.company as Control<string>).value;

        try {
            await appDispatch(authActions.login({email, password, company})).unwrap();
            const to = location.state?.from?.pathname || "/";
            setTimeout(() => navigate(to, {replace: true}));
        }
        catch (e) {
            setHasLoginFailed(true);
        }
        finally {
            setIsLoading(false);
        }
    };
    //#endregion

    //#region Render
    const errorMessageTitle: JSX.Element = (
        <h5 className="large text-align-center text-color-danger">E-mail ou senha incorretos</h5>
    );
    return (
        <section>
            <article className={classes.loginView}>
                <header className={classes.header}>
                    <img src={logoPng} alt="Enterprize ERP" />
                </header>

                <Form className="mgt3"
                      controlGroup={loginForm}
                      onSubmit={submitHandler}>
                    <If expression={!hasLoginFailed} else={errorMessageTitle}>
                        <h5 className="large text-align-center">Login</h5>
                    </If>

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

                    <Button size="large" className="mgt3" type="submit" block
                            disabled={isLoading} loading={isLoading}>
                        Login
                    </Button>

                    <div className="text-align-center">
                        <div className="mgt1">
                            <Link to="../../recover-password">Esqueci minha senha</Link>
                        </div>

                        <div className="mgt1">
                            Não possui conta? <a href="https://www.google.com/">Criar conta</a>
                        </div>
                    </div>

                </Form>
            </article>

            <footer className={`${classes.footer} mgb1 mgr1`}>
                <CopyRight />
            </footer>
        </section>
    );
    //#endregion
};

export default LoginView;
