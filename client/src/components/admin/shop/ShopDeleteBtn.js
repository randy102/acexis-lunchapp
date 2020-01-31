import React, { useEffect, useState } from "react";
import { message } from "antd";
import { useMutation } from "@apollo/client";
import { DELETE_SHOP } from "../../../graphql/shop";
import DeleteBtn from "../custom/DeleteBtn";

export default function ShopDeleteBtn({ refetch, gridApi, setCurShop }) {
    const [visible, setVisible] = useState(false);
    const [deleteShop, { data }] = useMutation(DELETE_SHOP);

    function handleDelete() {
        const selected = gridApi.getSelectedRows();
        if (selected.length > 0) {
            const { _id: id } = selected[0];
            deleteShop({ variables: { id } });
            setVisible(true);
        } else {
            message.error("Must choose a Shop!");
        }
    }

    useEffect(() => {
        refetch();
        setVisible(false);
        setCurShop("");
    }, [data]);

    const props = {
        visible,
        confirmTitle:"Are you sure delete this Shop? This action will delete all dishes of this Shop!",
        btnName: "Delete Shop",
        handleDelete
    };
    return <DeleteBtn {...props} />;
}
