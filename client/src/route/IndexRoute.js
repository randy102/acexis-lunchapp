import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from '../components/auth/Login'
import { appGuard, adminGuard } from '../services/guard'

export default function IndexRoute() {
    return (
        <div>
            <Switch>
                <Route path="/admin" render={adminGuard} />
                <Route path="/app" render={appGuard} />
                <Route path="/login" component={Login}/>
                <Route path="/" render={appGuard}/>
            </Switch>
        </div>
    )
}
