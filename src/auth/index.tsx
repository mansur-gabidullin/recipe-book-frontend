import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./components/Login";
import {PageNotFound} from "../shared/components/PageNotFound";

export default function Auth() {
    return (
        <Routes>
            <Route index element={<Navigate to="./login" replace/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/*" element={<PageNotFound/>}/>
        </Routes>
    )
}
