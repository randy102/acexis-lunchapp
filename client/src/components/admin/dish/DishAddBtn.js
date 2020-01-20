import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { useMutation } from "@apollo/client";
import { validateUserInput } from "../../../services/user";
import AddBtn from "../custom/AddBtn";
import { ADD_DISH } from '../../../graphql/dish';

export default function DishAddBtn({refetch, curShop}) {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [name, setName] = useState("");
    const [addDish, { data }] = useMutation(ADD_DISH);

    function showModal() {
        if(!curShop){
            message.error("Must choose a Shop");
            return;
        }
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

        addDish({
            variables: {
                name,
                shop: curShop
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
        btnName: "Add Dish",
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
                    placeholder="Dish name..."
                />
            </Form.Item>
        </Form>
    </AddBtn>
    )
}
