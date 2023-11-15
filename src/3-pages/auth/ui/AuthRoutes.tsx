import { Navigate, Route, Routes } from "react-router-dom";

import { PageNotFound } from "@/7-shared/ui/PageNotFound";

import { Login } from "./Login";

export function AuthRoutes() {
    return (
        <Routes>
            <Route index element={<Navigate to="./login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<PageNotFound />} />
        </Routes>
    );
}
