import React, { useState, useEffect } from "react";
import { Form, message, InputNumber, Input } from "antd";
import { useMutation } from "@apollo/client";
import AddBtn from "../admin/custom/AddBtn";
import { ADD_ORDER_USER } from "../../graphql/order";


export default function OrderAddBtn({ gridApi, refetch, orderApi }) {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [item, setItem] = useState("");
    const [note, setNote] = useState("");
    const [quantity, setQuantity] = useState(1);

    const [addOrder, { data }] = useMutation(ADD_ORDER_USER);

    function showModal() {
        const orders = orderApi.getDisplayedRowCount();
        if(orders > 0){
            message.error("You have ordered already!");
            return;
        }


        let selected = gridApi.getSelectedRows();
        if (selected.length > 0) {
            selected = selected[0];

            if (selected["total"] - selected["booked"] <= 0) {
                message.error("Item out of stock!");
                return;
            }

            setItem(selected["_id"]);
            setVisible(true); //Show modal
        } else {
            message.error("Must choose an Item!");
        }
    }

    function handleCancel() {
        setVisible(false);
    }

    function handleOk() {

        setConfirmLoading(true);
        
        addOrder({
            variables: {
                quantity,
                item,
                note
            }
        });
    }

    useEffect(() => {
        if(data && data.addOrderUser.error){
            message.error(data.addOrderUser.error);
        }
        refetch();
        setConfirmLoading(false);
        setVisible(false);
        setQuantity(1);
        setNote("");
    }, [data]);

    const props = {
        showModal,
        handleCancel,
        handleOk,
        btnName: "Add Order",
        visible,
        confirmLoading
    };


    return (
        <AddBtn {...props}>
            <Form>
                <b>Quantity: </b>
                <InputNumber
                    min={1}
                    max={1}
                    value={quantity}
                    onChange={value => setQuantity(value)}
                    placeholder="Quantity..."
                />
                <div style={{ margin: "10px 0" }}></div>
                <Input
                    type="text"
                    onChange={e => setNote(e.target.value)}
                    value={note}
                    placeholder="Note..."
                />
            </Form>
        </AddBtn>
    );
}
