import { FC, Fragment } from "react";
import { Link } from "react-router-dom";

const DashboardView: FC = () => {

    //#region Render
    return (
        <Fragment>
            <h1>Hello from --&gt; DashboardView!</h1>
            <Link to="/auth">Auth</Link>
        </Fragment>
    );
    //#endregion
};

export default DashboardView;
