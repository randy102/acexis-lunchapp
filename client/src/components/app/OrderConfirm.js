import React, { useEffect, useState } from "react";
import { message } from "antd";
import { useMutation } from "@apollo/client";
import ConfirmBtn from "../admin/custom/ConfirmBtn";
import { CONFIRM_ORDER } from "../../graphql/order";

export default function OrderConfirmBtn({gridApi, refetch}) {
    const [visible, setVisible] = useState(false);
    const [confirmOrder, { data }] = useMutation(CONFIRM_ORDER);

    function handleConfirm() {
        const selected = gridApi.getSelectedRows();
        
        if (selected.length > 0) {
            const { _id: id } = selected[0];
            confirmOrder({ variables: { id } });
            setVisible(true); //Show modal
        } else {
            message.error("Must choose an Order!");
        }
    }

    useEffect(() => {
        
            console.log({data});
            if(data && data.confirmOrder.success)
                message.success(data.confirmOrder.success)
            
            if(data && data.confirmOrder.error)
                message.error(data.confirmOrder.error)
        
        refetch();
        setVisible(false);
        
    }, [data]);

    const props = {
        visible,
        confirmTitle:"Are you sure confirm this Order?",
        btnName: "Confirm Order",
        handleConfirm
    };
    return <ConfirmBtn {...props} />;
}
