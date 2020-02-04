import React, { useEffect, useState } from "react";
import { message } from "antd";
import { useMutation } from "@apollo/client";
import DeleteBtn from "../custom/DeleteBtn";
import { DELETE_ITEM } from "../../../graphql/item";
import {getUser} from "../../../services/auth";
export default function ItemDeleteBtn({gridApi, refetch}) {
    const [visible, setVisible] = useState(false);
    const [deleteItem, { data }] = useMutation(DELETE_ITEM);

    function handleDelete() {
        if (getUser("role") === "MOD") {
            message.error("Sorry, you are not authorized to do this action")
            return;
        }

        const selected = gridApi.getSelectedRows();
        if (selected.length > 0) {

            if(selected[0]['booked'] > 0){
                message.error("Can not delete Item when it is booked!");
                return;
            }
            
            const { _id: id } = selected[0];
            deleteItem({ variables: { id } });
            setVisible(true); //Show modal
        } else {
            message.error("Must choose an Item!");
        }
    }

    useEffect(() => {
        refetch();
        setVisible(false);
    }, [data]);

    const props = {
        visible,
        confirmTitle:"Are you sure delete this Item?",
        btnName: "Delete Item",
        handleDelete
    };
    return <DeleteBtn {...props} />;
}
