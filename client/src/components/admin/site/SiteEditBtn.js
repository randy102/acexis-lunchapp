import React, { useState, useEffect } from "react";
import { Button, Form, Input, Modal, message } from "antd";
import { useMutation } from "@apollo/client";
import { UPDATE_SITE } from '../../../graphql/site';
import { checkEmpty } from "../../../services/user";

export default function SiteEditBtn({gridApi, refetch}) {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [name, setName] = useState("");
    const [updateSite, { data }] = useMutation(UPDATE_SITE);
    const [id, setId] = useState("");
    function handleOk() {

        const {isValid, error} = checkEmpty({name});

        if(!isValid){
            message.error(error);
            return;
        }
        setConfirmLoading(true); 

        updateSite({
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
            message.error("Must choose a Site!");
        }
    }

    useEffect(() => {
        refetch();
        setVisible(false);
        setConfirmLoading(false);
        setName("");
    }, [data]);

    return (
        <div className="user-btn">
            <Button type="ghost" onClick={handleEdit}>
                Edit User
            </Button>
            <Modal
                title="Edit User"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={() => setVisible(false)}
            >
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
            </Modal>
        </div>
    )
}
