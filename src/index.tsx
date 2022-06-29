import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "./assets/styles/main.scss";

import App from "./App/App";
import { store } from "./App";
// import { AuthContextProvider } from "./Auth/shared/context";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    //<React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                {/*<AuthContextProvider>*/}
                    <App />
                {/*</AuthContextProvider>*/}
            </Provider>
        </BrowserRouter>
    //</React.StrictMode>
);

/*

Files named "*Module.tsx" holds the Routing definition and lazy loading
Testing
    If route is accessible
    If validation works correctly
    If business logic works correctly

Modules Structure:
/auth (AuthModule.tsx)
    redirects to /login
    /login (LoginModule.tsx)
        LoginView.tsx
    /recover-password (RecoverPasswordModule.tsx)
        RecoverPasswordView.tsx (on send token, sets token in localstorage to validate against in /set-password/:token
        /sent
            SentView.tsx
        /set-password/:token (checks if token is valid, otherwise go to /recover-password)
            SetPasswordView.tsx
            /success
/dashboard

 */

