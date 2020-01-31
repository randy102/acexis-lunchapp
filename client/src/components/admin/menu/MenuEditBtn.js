import React, { useState, useEffect } from "react";
import {Form, Input,message, Select } from "antd";
import { useMutation } from "@apollo/client";
import EditBtn from "../custom/EditBtn";
import { UPDATE_MENU } from "../../../graphql/menu";
import { checkEmpty } from "../../../services/user";
import { checkMenuStatus } from "../../../services/menu";
const {Option} = Select;
export default function MenuEditBtn({gridApi, refetch}) {

    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [name, setName] = useState("");
    const [status, setStatus] = useState("UNPUBLISHED");
    const [updateMenu, { data }] = useMutation(UPDATE_MENU);
    const [id, setId] = useState("");

    function handleOk() {
        const {isValid, error} = checkEmpty({name});

        if(!isValid){
            message.error(error);
            return;
        }

        setConfirmLoading(true); 

        updateMenu({
            variables: {
                id,
                name,
                status
            }
        });
    }

    function handleEdit() {
        let selected = gridApi.getSelectedRows();

        

        if (selected.length > 0) {

            selected = selected[0];

            if(selected['status'] === "BLOCKED"){
                message.error("Can not change Blocked Menu");
                return;
            }

            setName(selected["name"]);
            setId(selected["_id"]);
            setStatus(selected["status"])
            setVisible(true);
        } else {
            message.error("Must choose a Menu!");
        }
    }

    function handleChange(curStatus){
        const statusCheck = checkMenuStatus(curStatus, status, gridApi);

        if(!statusCheck.isValid){
            message.error(statusCheck.error);
            return;
        }

        setStatus(curStatus);
    }

    useEffect(() => {
        refetch();
        setVisible(false);
        setConfirmLoading(false);
        setName("");
        setStatus("");
    }, [data]);

    const props = {
        visible,
        handleEdit,
        handleOk,
        confirmLoading,
        setVisible,
        btnName: "Edit Menu"
    }

    return (
        <EditBtn {...props}>
            <form>
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
                        onChange={handleChange}
                    >
                        <Option value="UNPUBLISHED">UnPublished</Option>
                        <Option value="PUBLISHED">Published</Option>
                        <Option value="CLOSED">Closed</Option>
                        <Option value="BLOCKED">BLOCKED</Option>
                    </Select>
                </Form.Item>
            </form>
        </EditBtn>
    );
}
