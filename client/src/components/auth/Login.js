import React from 'react'
import {useLazyQuery} from "@apollo/client"
import { Form, Icon, Input, Button, message } from "antd";
import { Redirect } from "react-router-dom";
import sha from "sha.js";
import { USER_LOGIN } from '../../graphql/login';
import { isLogin, getUser, logIn } from '../../services/auth';
import "../../assets/css/auth.css"

export default function Login() {
    const [doLogin, {data}] = useLazyQuery(USER_LOGIN);

    function handleSubmit(e){
        e.preventDefault();
        const name = e.target.username.value;
        const pass = e.target.password.value;
        var password = sha('sha256').update(pass).digest('hex');

        doLogin({
            variables:{
                name,
                password
            }
        })
    }

    if(data){
        if(data.login === "error")
            message.error("Login Fail!");
        else
            logIn(data.login);
    }

    if(isLogin()){
        const role = getUser('role');
        if(role === "ADMIN" || role === "MOD")
            return <Redirect to="/admin" />
        else
            return <Redirect to="/app" />
    }

    return (
        <div id="loginFormWrap">
            <h1><Icon type="user" /> Login</h1>

            <Form className="login-form" onSubmit={handleSubmit}>
                <Form.Item>
                    <Input
                        prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }}/>}
                        placeholder="User name..."
                        type="text"
                        name="username"
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }}/>}
                        type="password"
                        placeholder="Password..."
                        name="password"
                    />
                </Form.Item>
                <Form.Item>
                   
                    <Button type="primary" htmlType="submit" className="login-form-button" >
                        Log in
                    </Button>
                   
                </Form.Item>
            </Form>
        </div>
    )
}
