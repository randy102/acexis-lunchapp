import React, { useState, useEffect } from "react";
import { Form, Input, message, InputNumber } from "antd";
import { useMutation } from "@apollo/client";
import EditBtn from "../custom/EditBtn";
import { checkEmpty } from "../../../services/user";
import { UPDATE_ITEM } from "../../../graphql/item";

export default function ItemEditBtn({ gridApi, refetch }) {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [name, setName] = useState("");
    const [total, setTotal] = useState(1);
    const [booked, setBooked] = useState(0);
    const [updateItem, { data }] = useMutation(UPDATE_ITEM);
    const [id, setId] = useState("");

    function handleOk() {
        const { isValid, error } = checkEmpty({ name });

        if (!isValid) {
            message.error(error);
            return;
        }

        if(total < booked){
            message.error("Amount of Total is less than Booked!");
            return;
        }

        setConfirmLoading(true);

        updateItem({
            variables: {
                id,
                name,
                total
            }
        });
    }

    function handleEdit() {
        let selected = gridApi.getSelectedRows();
        if (selected.length > 0) {
            selected = selected[0];
            setName(selected["name"]);
            setTotal(selected["total"]);
            setId(selected["_id"]);
            setBooked(selected["booked"]);
            setVisible(true);
        } else {
            message.error("Must choose an Item!");
        }
    }

    useEffect(() => {
        refetch();
        setVisible(false);
        setConfirmLoading(false);
        setName("");
        setBooked(0);
        setTotal(1);
    }, [data]);

    const props = {
        visible,
        handleEdit,
        handleOk,
        confirmLoading,
        setVisible,
        btnName: "Edit Item"
    };

    return (
        <EditBtn {...props}>
            <form>
                <Form.Item>
                    <Input
                        type="text"
                        onChange={e => setName(e.target.value)}
                        value={name}
                        placeholder="Item name..."
                    />
                    <InputNumber
                        min={1}
                        value={total}
                        type="text"
                        onChange={value => setTotal(value)}
                        placeholder="Total..."
                    />
                </Form.Item>
            </form>
        </EditBtn>
    );
}
