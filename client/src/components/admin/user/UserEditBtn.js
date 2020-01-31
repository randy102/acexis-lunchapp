import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, Modal, message } from "antd";
import SiteOption from "./SiteOption";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../graphql/user";
import { hashPassword } from "../../../services/auth";
const { Option } = Select;

export default function UserEditBtn({ gridApi, refetch }) {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [role, setRole] = useState("");
    const [site, setSite] = useState("");
    const [status, setStatus] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [id, setId] = useState("");
    const [updateUser, { data }] = useMutation(UPDATE_USER);

    function handleOk() {

        setConfirmLoading(true);
        let data = {
            site,
            role,
            status
        };

        if (password !== "") data = { ...data, password: hashPassword(password) };

        updateUser({
            variables: {
                id,
                data: JSON.stringify(data)
            }
        });
    }

    function handleEdit() {
        let selected = gridApi.getSelectedRows();
        if (selected.length > 0) {
            selected = selected[0];
            setRole(selected["role"]);
            setSite(selected["siteId"]);
            setStatus(selected["status"]);
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
        setPassword("");
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
                        <Input value={name} disabled />
                    </Form.Item>

                    <Form.Item>
                        <Input.Password
                            placeholder="Password..."
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Select
                            onChange={value => setRole(value)}
                            placeholder="Choose role..."
                            value={role}
                        >
                            <Option value="ADMIN">Admin</Option>
                            <Option value="MOD">Mod</Option>
                            <Option value="USER">User</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <SiteOption site={site} setSite={setSite} />
                    </Form.Item>

                    <Form.Item>
                        <Select
                            onChange={value => setStatus(value)}
                            value={status}
                        >
                            <Option value="ACTIVE">Active</Option>
                            <Option value="BLOCKED">Blocked</Option>
                        </Select>
                    </Form.Item>
                </form>
            </Modal>
        </div>
    );
}
