import {Redirect, Route, Switch} from "wouter";

import {Layout} from "./Layout";
import {UserList} from "./UserList";

export function AdminPanel() {
    return (
        <Layout>
            <Switch>
                <Route path="/"><Redirect to="/users"/></Route>
                <Route path="/users"><UserList/></Route>
            </Switch>
        </Layout>
    )
}
