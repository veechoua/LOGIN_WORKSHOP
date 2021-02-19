import React from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import UserAdd from "../Pages/User/UserAdd";
import Test from '../Pages/User/Test';
export default function Routes() {
    return (
        <div>

            <Router>
                <Switch>
                    <Route exact path="/add-user">
                        <UserAdd />
                    </Route>
                    <Route path="/test">
                        <Test />
                    </Route>
                </Switch>
            </Router>
            
        </div>
    )
}
