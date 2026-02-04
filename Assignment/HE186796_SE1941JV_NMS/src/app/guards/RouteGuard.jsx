import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthStatesContext } from "../provider/AuthProvider";



export const ProtectedRoute = () => {
    const { userContext } = useContext(AuthStatesContext);

    return userContext ? <Outlet /> : <Navigate to="/login" replace />;
};


export const RejectedRoute = () => {
    const { userContext } = useContext(AuthStatesContext);

    return !userContext ? <Outlet /> : <Navigate to="/" replace />;
};