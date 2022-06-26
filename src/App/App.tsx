import React from "react";
import { Route, Routes } from "react-router-dom";

import { AuthGuard } from "../Auth";
import { CookieWarningPopUp } from "./components";
import { LazyLoadingFallback } from "./shared";
import Page404View from "./views/Page404/Page404View";

const AuthModule = React.lazy(() => import("../Auth/AuthModule"));
const DashboardModule = React.lazy(() => import("../Dashboard/DashboardModule"));

function App() {

    return (
        <main>
            <Routes>
                <Route path="/*" element={
                    <AuthGuard>
                        <React.Suspense fallback={<LazyLoadingFallback />}>
                            <DashboardModule />
                        </React.Suspense>
                    </AuthGuard>
                } />
                <Route path="/auth/*" element={
                    <React.Suspense fallback={<LazyLoadingFallback />}>
                        <AuthModule />
                    </React.Suspense>
                } />

                {/*
                 For some reason, I still could not make 404 works with "*" when using nested routes.
                 The workaround I used is in every module route definition set an "*" route to redirect
                 to /404 page.
                 Perhaps using an interceptor like Authentication might do the trick
                */}
                <Route path="/404" element={<Page404View />} />
            </Routes>

            <CookieWarningPopUp />
        </main>
    );
}

export default App;
