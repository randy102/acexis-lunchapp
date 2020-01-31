import React, { useState, useEffect } from "react";
import { Form, Input, Button, Icon, message } from "antd";
import { useMutation } from "@apollo/client";
import { CHANGE_PASSWORD } from "../../graphql/user";
import { hashPassword } from "../../services/auth";

export default function Password() {
    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [loading, setLoading] = useState(false);
    const [changePassword, { data }] = useMutation(CHANGE_PASSWORD);

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        changePassword({
            variables: {
                old: hashPassword(oldPass),
                password: hashPassword(newPass)
            }
        });
    }
    useEffect(() => {
        if (data) {
            setLoading(false);
            if (data.changePassword.success) message.success(data.changePassword.success);
            else message.error(data.changePassword.error);
            setNewPass("");
            setOldPass("");
        }
    }, [data]);

    return (
        <div style={{ width: 300, margin: "50px auto" }}>
            <Form onSubmit={handleSubmit}>
                <Form.Item>
                    <Input.Password
                        prefix={
                            <Icon
                                type="lock"
                                style={{ color: "rgba(0,0,0,.25)" }}
                            />
                        }
                        value={oldPass}
                        onChange={e => setOldPass(e.target.value)}
                        placeholder="Current password..."
                    />
                </Form.Item>
                <Form.Item>
                    <Input.Password
                        prefix={
                            <Icon
                                type="lock"
                                style={{ color: "rgba(0,0,0,.25)" }}
                            />
                        }
                        value={newPass}
                        onChange={e => setNewPass(e.target.value)}
                        placeholder="New password..."
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        loading={loading}
                        onClick={handleSubmit}
                        block
                        type="primary"
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
