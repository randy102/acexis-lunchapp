import React, { useEffect, useState } from "react";
import { message } from "antd";
import { useMutation } from "@apollo/client";
import { DELETE_MENU } from "../../../graphql/menu";
import DeleteBtn from "../custom/DeleteBtn";

export default function MenuDeleteBtn({ refetch, gridApi, setCurMenu }) {
    const [visible, setVisible] = useState(false);
    const [deleteMenu, { data }] = useMutation(DELETE_MENU);

    function handleDelete() {
        const selected = gridApi.getSelectedRows();
        if (selected.length > 0) {

            if(selected[0]['status'] !== "UNPUBLISHED"){
                message.error("Can not delete Menu after it is published");
                return;
            }
            
            const { _id: id } = selected[0];
            deleteMenu({ variables: { id } });
            setVisible(true);
        } else {
            message.error("Must choose a Menu!");
        }
    }

    useEffect(() => {
        refetch();
        setVisible(false);
        setCurMenu("");
    }, [data]);

    const props = {
        visible,
        confirmTitle:"Are you sure delete this Menu? This action will delete all items of this Menu!",
        btnName: "Delete Menu",
        handleDelete
    };
    return <DeleteBtn {...props} />;
}
