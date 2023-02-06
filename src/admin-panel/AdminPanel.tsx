import {memo} from "react";
import {Route, Router, Switch} from "wouter";
import {Layout} from "./components/Layout";

export const AdminPanel = memo(function AdminPanel() {
    return <Router base="/admin-panel">
        <Layout>
            <Switch>
                <Route path="/foo">
                    <div>foo</div>
                </Route>
                <Route path="/bar">
                    <div>bar</div>
                </Route>
            </Switch>
        </Layout>
    </Router>
})
