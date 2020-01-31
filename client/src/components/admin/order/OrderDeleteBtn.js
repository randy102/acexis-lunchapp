import React, { useEffect, useState } from "react";
import { message } from "antd";
import { useMutation } from "@apollo/client";
import DeleteBtn from "../custom/DeleteBtn";
import { DELETE_ORDER } from "../../../graphql/order";

export default function OrderDeleteBtn({gridApi, refetch}) {
    const [visible, setVisible] = useState(false);
    const [deleteOrder, { data }] = useMutation(DELETE_ORDER);

    function handleDelete() {
        const selected = gridApi.getSelectedRows();
        
        if (selected.length > 0) {
            const { _id: id } = selected[0];
            deleteOrder({ variables: { id } });
            setVisible(true); //Show modal
        } else {
            message.error("Must choose an Order!");
        }
    }

    useEffect(() => {
        refetch();
        setVisible(false);
    }, [data]);

    const props = {
        visible,
        confirmTitle:"Are you sure delete this Order?",
        btnName: "Delete Order",
        handleDelete
    };
    return <DeleteBtn {...props} />;
}
