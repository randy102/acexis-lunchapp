import React, { useState } from "react";
import * as moment from "moment";
import { useQuery } from "@apollo/client";
import { GET_USER_ORDERS } from "../../graphql/order";
import OrderGrid from "./OrderGrid";
import { Divider, Icon } from "antd";
import Menu from "./Menu";
import OrderDeleteBtn from "./OrderDelete";
import OrderConfirmBtn from "./OrderConfirm";

export default function Order() {
    const [orderApi, setOrderApi] = useState(undefined);
    const [menuRefetch, setMenuRefetch] = useState(false);

    const {
        data: orderData,
        loading: orderLoading,
        error: orderError,
        refetch: orderRefetch
    } = useQuery(GET_USER_ORDERS);

    const orderProps = {
        data: orderData,
        loading: orderLoading,
        error: orderError,
        setOrderApi
    };

    return (
        <div>
            <Divider>
                <h1>
                    <Icon type="menu" /> Menu
                </h1>
            </Divider>
            <Menu orderApi={orderApi} orderRefetch={() => orderRefetch()} menuRefetch={menuRefetch}/>

            <Divider>
                <h1>
                    <Icon type="profile" /> Ordered
                </h1>
            </Divider>
            <OrderDeleteBtn gridApi={orderApi} refetch={() => {orderRefetch(); setMenuRefetch(!menuRefetch)}} />
            <OrderConfirmBtn gridApi={orderApi} refetch={()=>{orderRefetch()}} />
            <OrderGrid {...orderProps} height="200px"/>
        </div>
    );
}
