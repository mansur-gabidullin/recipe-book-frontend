import {lazy, Suspense} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import {ProgressCircle} from "@adobe/react-spectrum";
import {QueryClientProvider} from "@tanstack/react-query";

import {PageNotFound} from "./shared/components/PageNotFound";
import {queryClient} from "./shared/api";
import ErrorBoundary from "./shared/components/ErrorBoundary";

const AdminPanel = lazy(() => import('./admin-panel'));
const RecipeBook = lazy(() => import('./recipe-book'));
const Authentication = lazy(() => import('./auth'));

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Suspense fallback={<ProgressCircle aria-label="Загрузка…" isIndeterminate/>}>
                <BrowserRouter>
                    <Routes>
                        <Route element={<ErrorBoundary/>}>
                            <Route index element={<Navigate to="./recipes" replace/>}/>
                            <Route path="/recipes/*" element={<RecipeBook/>}/>
                            <Route path="/admin-panel/*" element={<AdminPanel/>}/>
                            <Route path="/auth/*" element={<Authentication/>}/>
                            <Route path="/*" element={<PageNotFound/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Suspense>
        </QueryClientProvider>
    );
}
