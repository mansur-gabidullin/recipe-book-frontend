import { Outlet } from "react-router-dom";

import LogoutButton from "@/7-shared/auth/ui/LogoutButton";

export function Layout() {
    return (
        <div>
            <LogoutButton />
            <Outlet />
        </div>
    );
}
