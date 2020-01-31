import React, { useState, useEffect, useRef } from 'react'
import {useLazyQuery} from "@apollo/client"
import { Form, Icon, Input, Button, message } from "antd";
import { Redirect } from "react-router-dom";
import sha from "sha.js";
import { USER_LOGIN } from '../../graphql/login';
import { isLogin, getUser, logIn, hashPassword } from '../../services/auth';
import {checkEmpty} from "../../services/user"
import "../../assets/css/auth.css"

export default function Login() {
    const [doLogin, {data}] = useLazyQuery(USER_LOGIN);
    const [btnLoding, setBtnLoading] = useState(false);
    const [name,setName] = useState("");
    const [password, setPassword] = useState("");
 
    function handleSubmit(e){
        e.preventDefault();
        const {error,isValid} = checkEmpty({name,password});
        if(!isValid){
            message.error(error);
            return;
        }
        setBtnLoading(true);
        doLogin({
            variables:{
                name,
                password: hashPassword(password)
            }
        })
    }
    useEffect(()=>{
        if(data){
            setBtnLoading(false);
            if(data.login === "error"){
                message.error("Login Fail!");
                setName("");
                setPassword("");
            }
            else
                logIn(data.login);
        }
    },[data])
    

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
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </Form.Item>
                <Form.Item>
                    <Input.Password
                        prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }}/>}
                        placeholder="Password..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Item>
                <Form.Item>
                   
                    <Button type="primary" htmlType="submit" className="login-form-button" loading={btnLoding}>
                        Log in
                    </Button>
                   
                </Form.Item>
            </Form>
        </div>
    )
}
