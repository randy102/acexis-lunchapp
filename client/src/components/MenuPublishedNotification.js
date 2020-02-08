import React from "react";
import { isLogin, getUser } from "../services/auth";
import { useSubscription } from "@apollo/client";
import { MENU_PUBLISHED_SUBS } from "../graphql/menu";
import { notification, Icon } from "antd";

export default function MenuPublishedNotification() {
   
    const {data} = useSubscription(MENU_PUBLISHED_SUBS, {
        variables: {
            site: isLogin() ? getUser('site') : ""
        }
    })
    if(data && data.menuPublished && isLogin()){
       
        notification.open({
            message: "Menu is published! Ordering is available now!",
            icon: <Icon type="notification" />,
            placement: "bottomLeft"
        })
    }
    return <div></div>;
}
