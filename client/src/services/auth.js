import jwt from "jsonwebtoken"

export function isLogin(){
    if(getToken()){
        try{
            jwt.verify(getToken(), process.env.REACT_APP_JWT_SECRET);
            return true
        }
        catch(err){
            return false;
        }
    }
    return false;
}

export function logOut(){
    window.localStorage.removeItem("token");
}

export function logIn(token){
    window.localStorage.setItem("token", token);
}

export function getToken(){
    return window.localStorage.getItem("token");
}

export function getUser(field){
    if(field){
        return jwt.decode(getToken())[field];
    }
    else
        return jwt.decode(getToken());
}