import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { LOGIN_PAGE_ROUTE } from "@/shared/constants";
import { logout } from "@/shared/api";
import { setAuthRedirectLocation } from "@/shared/helpers";

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
