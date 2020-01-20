import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { useMutation } from "@apollo/client";
import { validateUserInput } from "../../../services/user";
import AddBtn from "../custom/AddBtn";
import { ADD_SHOP } from "../../../graphql/shop";

export default function ShopAddBtn({ refetch }) {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [name, setName] = useState("");
    const [addSite, { data }] = useMutation(ADD_SHOP);

    function showModal() {
        setVisible(true);
    }

    function handleCancel() {
        setVisible(false);
    }

    function handleOk() {
        const { isValid, error } = validateUserInput({ name });

        if (!isValid) {
            message.error(error);
            return;
        }

        setConfirmLoading(true);

        addSite({
            variables: {
                name
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
        btnName: "Add Shop",
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
                        placeholder="Shop name..."
                    />
                </Form.Item>
            </Form>
        </AddBtn>
    );
}
