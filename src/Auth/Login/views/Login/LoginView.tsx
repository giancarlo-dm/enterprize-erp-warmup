import { FC, FormEvent, useState } from "react";
import { Link, Location, useLocation, useNavigate } from "react-router-dom";

import { CopyRight, useAppDispatch } from "../../../../App";
import logoPng from "../../../../assets/images/logo.png";
import { BasicValidators, ControlState, InputText } from "../../../../Ui/Forms";
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

    //#region State
    const [email, setEmail] = useState("");
    const [emailIsValid, setEmailIsValid] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordIsValid, setPasswordIsValid] = useState(false);
    const [company, setCompany] = useState("");
    const [companyIsValid, setCompanyIsValid] = useState(false);
    //#endregion

    //#region Event Handlers
    const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!emailIsValid || !passwordIsValid || !companyIsValid) {
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

    const emailChangeHandler = (change: ControlState) => {
        setEmail(change.value);
        setEmailIsValid(change.isValid);

    };

    const passwordChangeHandler = (change: ControlState) => {
        setPassword(change.value);
        setPasswordIsValid(change.isValid);

    };

    const companyChangeHandler = (change: ControlState) => {
        setCompany(change.value);
        setCompanyIsValid(change.isValid);

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

                    <InputText label="E-mail" name="email" size="large" required
                               value={email}
                               validators={[BasicValidators.email()]}
                               errorMessages={{
                                   required: "E-mail é requerido.",
                                   email: "O E-mail informado não é válido."
                               }}
                               onChange={emailChangeHandler} />

                    <InputText label="Password" name="password" size="large" required
                               value={password}
                               errorMessages={{required: "Senha é requerido."}}
                               onChange={passwordChangeHandler} />

                    <InputText label="Empresa" name="company" size="large" required
                               value={company}
                               errorMessages={{required: "Empresa é requerido."}}
                               onChange={companyChangeHandler} />

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
