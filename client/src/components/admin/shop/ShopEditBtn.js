import React, { useState, useEffect } from "react";
import {Form, Input,message } from "antd";
import { useMutation } from "@apollo/client";
import EditBtn from "../custom/EditBtn";
import { UPDATE_SHOP } from "../../../graphql/shop";
import { validateUserInput } from "../../../services/user";

export default function ShopEditBtn({gridApi, refetch}) {

    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [name, setName] = useState("");
    const [updateShop, { data }] = useMutation(UPDATE_SHOP);
    const [id, setId] = useState("");
    function handleOk() {
        const {isValid, error} = validateUserInput({name});

        if(!isValid){
            message.error(error);
            return;
        }

        setConfirmLoading(true); 

        updateShop({
            variables: {
                id,
                name
            }
        });
    }

    function handleEdit() {
        let selected = gridApi.getSelectedRows();
    
        if (selected.length > 0) {
            selected = selected[0];
            setName(selected["name"]);
            setId(selected["_id"]);
            setVisible(true);
        } else {
            message.error("Must choose a User!");
        }
    }

    useEffect(() => {
        refetch();
        setVisible(false);
        setConfirmLoading(false);
        setName("");
    }, [data]);

    const props = {
        visible,
        handleEdit,
        handleOk,
        confirmLoading,
        setVisible,
        btnName: "Edit Shop"
    }

    return (
        <EditBtn {...props}>
            <form>
                <Form.Item>
                    <Input
                        type="text"
                        onChange={e => setName(e.target.value)}
                        value={name}
                        placeholder="Site name..."
                    />
                </Form.Item>
            </form>
        </EditBtn>
    );
}
