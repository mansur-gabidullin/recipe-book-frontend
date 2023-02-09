import {lazy, Suspense} from "react";
import {Redirect, Route, Router, Switch} from "wouter";
import {ProgressCircle} from "@adobe/react-spectrum";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import {PageNotFound} from "./shared/components/PageNotFound";

const queryClient = new QueryClient()
const AdminPanel = lazy(() => import('./admin-panel'));
const RecipeBook = lazy(() => import('./recipe-book'));

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Suspense fallback={<ProgressCircle aria-label="Загрузка…" isIndeterminate/>}>
                <Switch>
                    <Route path="/"><Redirect to="/recipes"/></Route>
                    <Route path="/recipes/:rest*"><Router base="/recipes"><RecipeBook/></Router></Route>
                    <Route path="/admin-panel/:rest*"><Router base="/admin-panel"><AdminPanel/></Router></Route>
                    <Route path="/:rest*"><PageNotFound/></Route>
                </Switch>
            </Suspense>
        </QueryClientProvider>
    );
}
