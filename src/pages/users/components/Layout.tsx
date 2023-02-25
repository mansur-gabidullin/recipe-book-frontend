import { Outlet } from "react-router-dom";

import LogoutButton from "@/pages/auth/components/LogoutButton";

export function Layout() {
    return (
        <div>
            <LogoutButton />
            <Outlet />
        </div>
    );
}
