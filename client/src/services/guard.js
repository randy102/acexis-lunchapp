import { isLogin, getUser } from "./auth";
import { Redirect } from "react-router-dom";
import React from "react";
import App from "../components/app/App";
import Admin from "../components/admin/Admin";

export function appGuard(props){
    return isLogin()  ? <App {...props}/>: <Redirect to="/login"/>
}

export function adminGuard(props){
    if(isLogin()){
        return ['ADMIN', 'MOD'].includes(getUser('role')) ? <Admin {...props} /> : <App {...props}/>
    }
    return <Redirect to="/login"/>;
}