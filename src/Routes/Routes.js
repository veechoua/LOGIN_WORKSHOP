import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserAdd from "../Pages/User/UserAdd";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import CustomSideNav from "../const/CustomSideNav";
import EditUser from "../Pages/User/EditUser";

export default function Routes() {
  return (
    <div>
      <Router>
        <Switch>
          <PublicRoute exact path="/" component={Login} />
          <Route
            render={({ location, history }) => (
              <React.Fragment>
                <CustomSideNav location={location} history={history} />
                  <div style={{marginLeft:"70px"}}>
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
                  <PrivateRoute
                    exact
                    path="/edit-user"
                    component={(props) => <EditUser />}
                  />
                </div>
              </React.Fragment>
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}
