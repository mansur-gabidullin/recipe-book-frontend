import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import ErrorBoundary from "@/shared/components/ErrorBoundary";
import { PageNotFound } from "@/shared/components/PageNotFound";

const AdminPanel = lazy(async () => await import("@/pages/users"));
const RecipeBook = lazy(async () => await import("@/pages/recipe-book"));
const Authentication = lazy(async () => await import("@/pages/auth"));

export function Pages() {
    return (
        <Routes>
            <Route element={<ErrorBoundary />}>
                <Route index element={<Navigate to="./recipes" replace />} />
                <Route path="/recipes/*" element={<RecipeBook />} />
                <Route path="/admin-panel/*" element={<AdminPanel />} />
                <Route path="/auth/*" element={<Authentication />} />
                <Route path="/*" element={<PageNotFound />} />
            </Route>
        </Routes>
    );
}
