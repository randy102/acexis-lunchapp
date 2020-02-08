import React from 'react'
import { Route, Switch } from "react-router-dom";
import Password from "../components/app/Password";
import Order from "../components/app/Order";
import MenuPublishedNotification from '../components/MenuPublishedNotification';

export default function AppRoute(props) {
    return (
        <div id="AppRouteWrap">
                <Switch>
                    <Route path={`${props.match.url}/password`} component={Password} />
                    <Route path={`${props.match.url}/order`} component={Order} />
                    <Route path={`${props.match.url}/`} component={Order} />
                </Switch>
            <MenuPublishedNotification/>
        </div>
    )
}
