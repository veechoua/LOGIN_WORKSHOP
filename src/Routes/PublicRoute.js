import React from 'react'
import {Route, Redirect} from 'react-router-dom';
export default function PublicRoute({component:Component,headerTitle,...res}) {
    return (
        <Route
        {...res}
        render={props=>{
            return(
                <div>
                    <Component {...props} />
                </div>
            )
        }}
         />
    )
}
