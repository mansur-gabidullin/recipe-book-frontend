import { Outlet } from "react-router-dom";

import LogoutButton from "@/shared/components/LogoutButton";

export function Layout() {
    return (
        <div>
            <LogoutButton />
            <Outlet />
        </div>
    );
}
