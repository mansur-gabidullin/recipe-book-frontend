import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import ErrorBoundary from "@/7-shared/ui/ErrorBoundary";
import { PageNotFound } from "@/7-shared/ui/PageNotFound";

import { Bin } from "@/3-pages/bin";

const AdminPanel = lazy(async () => await import("@/3-pages/users"));
const RecipeBook = lazy(async () => await import("@/3-pages/recipe-book"));
const Authentication = lazy(async () => await import("@/3-pages/auth"));

export function AppRoutes() {
    return (
        <Routes>
            <Route element={<ErrorBoundary />}>
                <Route index element={<Navigate to="./recipes" replace />} />
                <Route path="/recipes/*" element={<RecipeBook />} />
                <Route path="/admin-panel/bin" element={<Bin />} />
                <Route path="/admin-panel/*" element={<AdminPanel />} />
                <Route path="/auth/*" element={<Authentication />} />
                <Route path="/*" element={<PageNotFound />} />
            </Route>
        </Routes>
    );
}
