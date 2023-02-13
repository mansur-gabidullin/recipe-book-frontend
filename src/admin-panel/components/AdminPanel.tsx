import {Navigate, Route, Routes} from "react-router-dom";

import {Layout} from "./Layout";
import {UserList} from "./UserList";
import {PageNotFound} from "../../shared/components/PageNotFound";

export function AdminPanel() {
    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route index element={<Navigate to="./users" replace/>}/>
                <Route path="/users" element={<UserList/>}/>
                <Route path="/*" element={<PageNotFound/>}/>
            </Route>
        </Routes>
    )
}
