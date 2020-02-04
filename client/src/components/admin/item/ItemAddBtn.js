import React, { useState, useEffect } from "react";
import { Form, Input, message, InputNumber } from "antd";
import { useMutation } from "@apollo/client";
import { checkEmpty } from "../../../services/user";
import AddBtn from "../custom/AddBtn";
import { ADD_ITEM } from "../../../graphql/item";
import {getUser} from "../../../services/auth";

export default function ItemAddBtn({ refetch, curMenu }) {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [name, setName] = useState("");
    const [total, setTotal] = useState(1);
    const [addItem, { data }] = useMutation(ADD_ITEM);

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
        const { isValid, error } = checkEmpty({ name });

        if (!isValid) {
            message.error(error);
            return;
        }

        setConfirmLoading(true);

        addItem({
            variables: {
                name,
                menu: curMenu,
                total,
            }
        });
    }

    useEffect(() => {
        refetch();
        setConfirmLoading(false);
        setVisible(false);
        setName("");
    }, [data]);

    const props = {
        showModal,
        handleCancel,
        handleOk,
        btnName: "Add Item",
        visible,
        confirmLoading
    };

    return (
        <AddBtn {...props}>
            <Form>
                <Form.Item>
                    <Input
                        type="text"
                        onChange={e => setName(e.target.value)}
                        value={name}
                        placeholder="Item name..."
                    />

                    <InputNumber
                        min={1}
                        defaultValue={total}
                        type="text"
                        onChange={value => setTotal(value)}
                        placeholder="Total..."
                    />
                </Form.Item>
            </Form>
        </AddBtn>
    );
}
