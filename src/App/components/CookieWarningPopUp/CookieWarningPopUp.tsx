import { FC, useState } from "react";
import { localStorageKeysConstant } from "../../shared";

import classes from "./CookieWarningPopUp.module.scss";

export const CookieWarningPopUp: FC = () => {

    //#region Attributes
    const [hideCookieWarning, setHideCookieWarning] = useState(Boolean(localStorage.getItem(localStorageKeysConstant.hideCookieWarning)));
    //#endregion

    //#region Event Handlers
    const enableCookiesHandler = () => {
        localStorage.setItem(localStorageKeysConstant.hideCookieWarning, String(true));
        setHideCookieWarning(true);
    };
    //#endregion

    //#region Render
    return (
        hideCookieWarning
            ? null
            : <dialog className={classes.cookieDialog} open>
                <header>
                    <h5 className="large text-align-center">Aviso de cookies</h5>
                </header>

                <p className="text-align-center mgt1">
                    Este site faz uso de "cookies" e armazenamento local de dados no seu navegador. Ao
                    continuar a navegar na página você concorda com seu uso e o armazenamento local de
                    dados.
                </p>

                <footer className="mgt2">
                    <button type="button" className="block"
                            onClick={enableCookiesHandler}>
                        Concordar e Continuar
                    </button>
                </footer>
            </dialog>
    );
    //#endregion
};
