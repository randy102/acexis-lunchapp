import React, { useState, useEffect } from "react";
import { Button, Form, Input, Modal, message } from "antd";
import { useMutation } from "@apollo/client";
import { ADD_SITE } from "../../../graphql/site";
import { validateUserInput } from "../../../services/user";

export default function SiteAddBtn({refetch}) {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [name, setName] = useState("");
    const [addSite, { data }] = useMutation(ADD_SITE);

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

    return (
        <div className="user-btn">
            <Button type="primary" onClick={showModal}>
                Add Site
            </Button>
            <Modal
                title="Add Site"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
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
    );
}
