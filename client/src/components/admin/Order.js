import React, { useState } from "react";
import { Divider, Icon } from "antd";
import OrderGrid from "./order/OrderGrid";
import OrderDeleteBtn from "./order/OrderDeleteBtn";

export default function Order() {
    const [gridApi, setOrderApi] = useState(undefined);
    const [doRefetch, setDoRefetch] = useState(true);

    function orderRefetch() {
        setDoRefetch(!doRefetch);
    }

    return (
        <div>
            <Divider>
                <h1>
                    <Icon type="order" /> Order
                </h1>
            </Divider>

            <OrderDeleteBtn gridApi={gridApi} refetch={orderRefetch} />
            <OrderGrid setGridApi={setOrderApi} doRefetch={doRefetch} />
        </div>
    );
}
