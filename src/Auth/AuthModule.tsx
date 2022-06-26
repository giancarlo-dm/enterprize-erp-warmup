import React, { FC } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { LazyLoadingFallback } from "../App";
import { AlreadyLoggedInGuard } from "./shared";

const LoginModule = React.lazy(() => import("./Login/LoginModule"));
const RecoverPasswordModule = React.lazy(() => import("./RecoverPassword/RecoverPasswordModule"));

const AuthModule: FC = () => {

    //#region Render
    return (
        <Routes>
            <Route index element={<Navigate to="login" replace={true} />} />

            {/* Login submodule */}
            <Route path="login/*" element={
                <AlreadyLoggedInGuard>
                    <React.Suspense fallback={<LazyLoadingFallback />}>
                        <LoginModule />
                    </React.Suspense>
                </AlreadyLoggedInGuard>
            } />

            {/* RecoverPassword submodule */}
            <Route path="recover-password/*" element={
                <React.Suspense fallback={<LazyLoadingFallback />}>
                    <RecoverPasswordModule />
                </React.Suspense>
            } />

            {/* 404 page. Check comments on App.tsx */}
            <Route path="*" element={<Navigate to="/404" />}/>
        </Routes>
    );
    //#endregion
};

export default AuthModule;
