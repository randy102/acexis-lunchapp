import React, { useEffect, useState } from "react";
import { message } from "antd";
import { useMutation } from "@apollo/client";
import DeleteBtn from "../custom/DeleteBtn";
import { DELETE_DISH } from "../../../graphql/dish";

export default function DishDeleteBtn({gridApi, refetch}) {
    const [visible, setVisible] = useState(false);
    const [deleteSite, { data }] = useMutation(DELETE_DISH);

    function handleDelete() {
        const selected = gridApi.getSelectedRows();
        if (selected.length > 0) {
            const { _id: id } = selected[0];
            deleteSite({ variables: { id } });
            setVisible(true); //Show modal
        } else {
            message.error("Must choose a Dish!");
        }
    }

    useEffect(() => {
        refetch();
        setVisible(false);
    }, [data]);

    const props = {
        visible,
        confirmTitle:"Are you sure delete this Dish?",
        btnName: "Delete Dish",
        handleDelete
    };
    return <DeleteBtn {...props} />;
}
