import React, { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import DashboardView from "./views/Dashboard/DashboardView";

const DashboardModule: FC = () => {

    //#region Render
    return (
      <Routes>
          <Route index element={<DashboardView />} />

          {/* 404 page. Check comments on App.tsx */}
          <Route path="*" element={<Navigate to="/404" />}/>
      </Routes>
    );
    //#endregion
};

export default DashboardModule;
