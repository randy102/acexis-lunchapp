import React, { useState, useEffect } from "react";
import AddBtn from "../custom/AddBtn";
import { ADD_ITEMS_SHOP } from "../../../graphql/item";
import ShopOption from "./ShopOption";
import { useMutation } from "@apollo/client";
import { message, InputNumber, Alert } from "antd";
import DishGrid from "../dish/DishGrid";
import {getUser} from "../../../services/auth";
export default function ItemAddFromShop({ refetch, curMenu }) {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [shop, setShop] = useState("");
    const [gridApi, setGridApi] = useState(undefined);
    const [total, setTotal] = useState(1);
    const [addItem, { data }] = useMutation(ADD_ITEMS_SHOP);

    function showModal() {
        if (getUser("role") === "MOD") {
            message.error("Sorry, you are not authorized to do this action")
            return;
        }

        if (!curMenu) {
            message.error("Must choose a Menu");
            return;
        }
        setVisible(true);
    }

    function handleCancel() {
        setVisible(false);
    }

    function handleOk() {
        setConfirmLoading(true);

        const selected = gridApi.getSelectedRows();

        if (selected.length > 0) {

            addItem({
                variables: {
                    menu: curMenu,
                    shop,
                    items: JSON.stringify(selected),
                    total
                }
            });
        } else {
            message.error("Must choose a Dish!");
            return;
        }
    }

    useEffect(() => {
        refetch();
        setConfirmLoading(false);
        setVisible(false);
    }, [data]);

    const props = {
        showModal,
        visible,
        handleOk,
        confirmLoading,
        handleCancel,
        btnName: "Add From Shop"
    };
    return (
        <AddBtn {...props}>
            <ShopOption setShop={setShop} shop={shop} />
            
            <div style={{ margin: "15px 0" }}></div>

            <Alert message="You can choose many Dishes at once by pressing Ctrl + Click" type="info" showIcon />

            <div style={{ margin: "15px 0" }}></div>

            <DishGrid curShop={shop} setGridApi={setGridApi} multiple={true} />

            <div style={{ margin: "15px 0" }}></div>

            <b>Default Total: </b>
            <InputNumber
                min={1}
                value={total}
                onChange={value => setTotal(value)}
                placeholder="Default Total..."
            />
        </AddBtn>
    );
}
