import React from 'react'
import Header from "../Header"
import AppRoute from '../../route/AppRoute'
import "../../assets/css/app.css"

export default function App(props) {
    
    return (
        <div>
            <Header/>
            <AppRoute {...props}/>
            
        </div>
    )
}
