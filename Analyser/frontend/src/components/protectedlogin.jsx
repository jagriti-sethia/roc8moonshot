import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";

const ProtectedLoginRoute = () => {
    const token = sessionStorage.getItem("token");
    const location = useLocation(); // Get current location

    if (token) {
        // Redirect to login and save the current location the user wanted to visit
        return (
            <Navigate
                to="/home"
            // state={{ from: location }}
            />
        );
    }

    return <Outlet />;
};

export default ProtectedLoginRoute;