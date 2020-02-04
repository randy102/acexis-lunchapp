import React, { useState, useEffect } from "react";
import { Form, message, InputNumber, Input } from "antd";
import { useMutation } from "@apollo/client";
import AddBtn from "../custom/AddBtn";
import { ADD_ORDER } from "../../../graphql/order";
import UserSearch from "./UserOption";
import { checkEmpty } from "../../../services/user";
import {getUser} from "../../../services/auth";

export default function OrderAddBtn({ gridApi, curSite, refetch }) {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [user, setUser] = useState("");
    const [item, setItem] = useState("");
    const [note, setNote] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [remaining, setRemaining] = useState(0);

    const [addOrder, { data }] = useMutation(ADD_ORDER);
    
    function showModal() {
        if (getUser("role") === "MOD") {
            message.error("Sorry, you are not authorized to do this action")
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
            setRemaining(selected["total"] - selected["booked"]);
            setVisible(true); //Show modal
        } else {
            message.error("Must choose an Item!");
        }
    }

    function handleCancel() {
        setVisible(false);
    }

    function handleOk() {
        const { isValid} = checkEmpty({ user });

        if (!isValid) {
            message.error("Must choose a User");
            return;
        }

        setConfirmLoading(true);
        
        addOrder({
            variables: {
                user,
                quantity,
                item,
                note
            }
        });
    }

    useEffect(() => {
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
                <b>Choose User:</b>
                <UserSearch setUserId={setUser} curSite={curSite} />
                <div style={{ margin: "10px 0" }}></div>
                <b>Quantity: </b>
                <InputNumber
                    min={1}
                    max={remaining}
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
