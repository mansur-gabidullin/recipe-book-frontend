import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { setAuthRedirectLocation } from "@/7-shared/helpers";
import { LOGIN_PAGE_ROUTE } from "@/7-shared/auth/constants";
import { logout } from "@/7-shared/auth/api";

export default function LogoutButton() {
    const location = useLocation();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    useEffect(() => {
        if (!isLoggingOut) {
            return;
        }

        setAuthRedirectLocation(location.pathname);
        void logout();
    }, [isLoggingOut, location.pathname]);

    return isLoggingOut ? (
        <Navigate to={LOGIN_PAGE_ROUTE} />
    ) : (
        <button
            type="button"
            onClick={() => {
                setIsLoggingOut(true);
            }}
        >
            Разлогиниться
        </button>
    );
}
