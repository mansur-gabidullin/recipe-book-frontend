import {Outlet} from "react-router-dom";

import LogoutButton from "../../auth/components/LogoutButton";

export function Layout() {
    return (
        <div>
            <LogoutButton/>
            <Outlet/>
        </div>
    )
}
