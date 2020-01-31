import React, { useState } from "react";
import * as moment from "moment";
import { useQuery } from "@apollo/client";
import { GET_USER_ORDERS } from "../../graphql/order";
import OrderGrid from "./OrderGrid";
import { Divider, Icon } from "antd";

export default function Order() {
    const [orderApi, setOrderApi] = useState(undefined);

    const {
        data: orderData,
        loading: orderLoading,
        error: orderError
    } = useQuery(GET_USER_ORDERS, {
        variables: {
            date: moment().format("DD/MM/YYYY")
        }
    });

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
                    <Icon type="profile" /> Ordered
                </h1>
            </Divider>
            <OrderGrid {...orderProps} />
        </div>
    );
}
