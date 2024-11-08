import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contex/AuthContex";


function ProtectedRoute() {

    const { isAuthenticated, loading } = useAuth();

    if (!loading) {
        if (isAuthenticated) {
            return <Outlet />
        } else {
            return (
                <Navigate to="/auth/login" />
            )
        }
    }
}

export default ProtectedRoute;