import React from 'react'
import Header from "../Header"
import AdminRoute from "../../route/AdminRoute";
import LeftBar from "./LeftBar";
import "../../assets/css/admin.css"

export default function Admin(props) {
    return (
        <div>
            <Header/>
            <LeftBar {...props}/>
            <AdminRoute match={props.match}/>
        </div>
    )
}
