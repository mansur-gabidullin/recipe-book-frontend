import {lazy, Suspense} from "react";
import {Redirect, Route, Switch} from "wouter";
import {ProgressCircle} from "@adobe/react-spectrum";

import {PageNotFound} from "./shared/components/PageNotFound";

const AdminPanel = lazy(() => import('./admin-panel'));

function App() {
    return (
        <Suspense fallback={<ProgressCircle aria-label="Loading…" isIndeterminate />}>
            <Switch>
                <Route path="/"><Redirect to="./admin-panel"/></Route>
                <Route path="/admin-panel/:rest*"><AdminPanel/></Route>
                <Route path="/:rest*"><PageNotFound/></Route>
            </Switch>
        </Suspense>
    );
}

export default App;
