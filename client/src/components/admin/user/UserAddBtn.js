import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, Modal, message } from "antd";
import SiteOption from "./SiteOption";
import { useMutation } from "@apollo/client";
import sha from "sha.js";
import { ADD_USER } from "../../../graphql/user";
import { validateUserInput } from "../../../services/user";

const { Option } = Select;

export default function UserAddBtn({refetch}) {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [role, setRole] = useState('');
    const [site, setSite] = useState("");
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [addUser, {data}] = useMutation(ADD_USER);

    function showModal() {
        setVisible(true);
    }

    function handleCancel() {
        setVisible(false);
        message.error("Not succeed!");
    }

    function handleOk() {
        const {isValid, error} = validateUserInput({name, password, role, site});

        if(!isValid){
            message.error(error);
            return;
        }

        setConfirmLoading(true);
        
        addUser({
            variables: {
                user: {
                    name,
                    password: sha("sha256")
                        .update(password)
                        .digest("hex"),
                    status: "ACTIVE",
                    role,
                    site
                }
            }
        });
        
    }
    
    useEffect(()=>{
        refetch();
        setConfirmLoading(false);
        setVisible(false);
        setRole('');
        setSite('');
        setName('');
        setPassword('');
    },[data])
    
    return (
        <div className="user-btn">
            <Button type="primary" onClick={showModal}>
                Add User
            </Button>
            <Modal
                title="Add User"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <form>
                    <Form.Item>
                        <Input
                            type="text"
                            onChange={e => setName(e.target.value)} value={name}
                            placeholder="User name..."
                        />
                    </Form.Item>

                    <Form.Item>
                        <Input.Password
                            onChange={e => setPassword(e.target.value)} value={password}
                            placeholder="Password..."
                        />
                    </Form.Item>

                    <Form.Item>
                        <Select
                            value={role}
                            onChange={value => setRole(value)}
                            name="role"
                            placeholder="Choose role..."
                        >
                            <Option value="ADMIN">Admin</Option>
                            <Option value="MOD">Mod</Option>
                            <Option value="USER">User</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <SiteOption site={site} setSite={setSite} />
                    </Form.Item>
                </form>
            </Modal>
        </div>
    );
}
