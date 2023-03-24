import { Navigate, Route, Routes } from "react-router-dom";
import { PageNotFound } from "@/shared/components/PageNotFound";
import { Login } from "./Login";

export default function Auth() {
    return (
        <Routes>
            <Route index element={<Navigate to="./login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<PageNotFound />} />
        </Routes>
    );
}
