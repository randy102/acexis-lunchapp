import React from "react";
import { Route, Switch } from "react-router-dom";
import Site from "../components/admin/Site";
import User from "../components/admin/User";
import Shop from "../components/admin/Shop";
import Order from "../components/admin/Order";
import Menu from "../components/admin/Menu";
import Config from "../components/admin/Config";

export default function AdminRoute(props) {
    return (
        <div id="AdminRouteWrap">
            <Switch>
                <Route path={`${props.match.url}/config`} component={Config} />
                <Route path={`${props.match.url}/order`} component={Order} />
                <Route path={`${props.match.url}/menu`} component={Menu} />
                <Route path={`${props.match.url}/shop`} component={Shop} />
                <Route path={`${props.match.url}/site`} component={Site} />
                <Route path={`${props.match.url}/user`} component={User} />
                <Route path={`${props.match.url}/`} component={User} />
            </Switch>
        </div>
    );
}
