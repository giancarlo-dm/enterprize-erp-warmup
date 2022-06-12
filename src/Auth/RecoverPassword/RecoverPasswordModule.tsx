import React, { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import RecoverPasswordView from "./views/RecoverPassword/RecoverPasswordView";

const RecoverPasswordModule: FC = () => {

    //#region Render
    return (
        <Routes>
            <Route index element={<RecoverPasswordView />} />

            {/* 404 page. Check comments on App.tsx */}
            <Route path="*" element={<Navigate to="/404" />}/>
        </Routes>
    );
    //#endregion
};

export default RecoverPasswordModule;
