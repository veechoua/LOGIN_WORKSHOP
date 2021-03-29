import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserAdd from "../Pages/User/UserAdd";
import Test from "../Pages/User/Test";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
export default function Routes() {
  const User = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <Router>
        <Switch>
          <PublicRoute exact path="/" component={Login} />
          <Route
            render={({ lacation, history }) => (
              <React.Fragment>
                <PrivateRoute
                  exact
                  path="/manage-user"
                  component={(props) => <UserAdd />}
                />
                <PrivateRoute
                  exact
                  path="/home"
                  component={(props) => <Home />}
                />
              </React.Fragment>
            )}
          />
          {/* <Route exact path="/">
                        <Login />
                    </Route>
                    <Route exact path="/manage-user">
                        <UserAdd />
                    </Route>
                    <Route path="/test">
                        <Test />
                    </Route>
                    <Route path="/home" >
                        <Home />
                    </Route> */}
        </Switch>
      </Router>
    </div>
  );
}
