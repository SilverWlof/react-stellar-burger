import { FunctionComponent } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "../../services/storage/hooks";


type TProtectedProps = {
    component:any;
    onlyUnAuth:boolean;
};

export const Protected: FunctionComponent<TProtectedProps> = ({ onlyUnAuth = false, component,...props }) => {
    const isAuthChecked = useSelector((store) => store.user.isAuthChecked);
    const user = useSelector((store) => store.user.user);
    const location = useLocation();

    if (!isAuthChecked) {
        return null;
    }

    if (onlyUnAuth && user) {
        const { from } = location.state || { from: { pathname: "/" } };
        return <Navigate to={from} />;
    }

    if (!onlyUnAuth && !user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return component;
}




type TOnlyAuthProps = {
    component: any;
};

export const OnlyAuth: FunctionComponent<TOnlyAuthProps> = ({ component, ...props }) => {

    return <Protected onlyUnAuth={false} component={component} />
}



type TOnlyUnAuthProps = {
    component:any;
};

export const OnlyUnAuth: FunctionComponent<TOnlyUnAuthProps> =({ component }) => (
  <Protected onlyUnAuth={true} component={component} />
);