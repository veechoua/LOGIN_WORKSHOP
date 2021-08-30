import React from 'react'
import {Route, Redirect} from 'react-router-dom';
import { USER_KEY } from '../const';
import {isLogIn} from '../const/ConstHelp';
export default function PrivateRoute({component:Component,headerTitle,...rest}) {
    const isLogInOn = isLogIn();
    return (
        <Route
          {...rest}
          render={props =>
            isLogInOn
              ? <div>
                {/* <Header isAuthenticated headerTitle={headerTitle} /> */}
                <Component {...props} />
              </div>
              : <Redirect to='/' />}
        />
      )
}
