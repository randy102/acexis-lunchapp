import React, { useState, useEffect } from "react";
import { Form, Input, message, Select } from "antd";
import { useMutation } from "@apollo/client";
import { checkEmpty } from "../../../services/user";
import AddBtn from "../custom/AddBtn";
import { ADD_MENU } from "../../../graphql/menu";
import {getUser} from "../../../services/auth";
const {Option} = Select;

export default function MenuAddBtn({ refetch, site }) {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [name, setName] = useState("");
    const [status, setStatus] = useState("UNPUBLISHED");
    const [addMenu, { data }] = useMutation(ADD_MENU);

    function showModal() {
        if (getUser("role") === "MOD") {
            message.error("Sorry, you are not authorized to do this action")
            return;
        }

        if (site === "") {
            message.error("Must choose a Site!");
            return;
        }
        const dateString = new Date().toDateString();
        setName(`Menu ${ dateString }`); //Set default menu name
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

        addMenu({
            variables: {
                name,
                site,
                status
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
        btnName: "Add Menu",
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
                        placeholder="Menu name..."
                    />
                </Form.Item>

                <Form.Item>
                    <Select
                        value={status}
                        onChange={value => setStatus(value)}
                    >
                        <Option value="UNPUBLISHED">UnPublished</Option>
                    </Select>
                </Form.Item>
            </Form>
        </AddBtn>
    );
}
