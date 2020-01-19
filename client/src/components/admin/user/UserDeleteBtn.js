import React, { useEffect, useState } from "react";
import { Button, message, Popconfirm, Icon, Modal } from "antd";
import { useMutation } from "@apollo/client";
import { DELETE_USER } from "../../../graphql/user";

export default function UserDeleteBtn({ gridApi, refetch }) {
    const [visible, setVisible] = useState(false);
    const [deleteUser, { data }] = useMutation(DELETE_USER);

    function handleDelete() {
        const selected = gridApi.getSelectedRows();

        if (selected.length > 0) {
            const { _id: id } = selected[0];
            deleteUser({ variables: { id } });
            setVisible(true);
        } else {
            message.error("Must choose a User!");
        }
    }

    useEffect(() => {
        setVisible(false);
        refetch();
    }, [data, refetch]);

    return (
        <div className="user-btn">
            <Popconfirm
                title="Are you sure delete this User?"
                onConfirm={handleDelete}
                okText="Yes"
                cancelText="No"
            >
                <Button type="danger">Delete User</Button>
                <Modal
                    title="Deleting..."
                    visible={visible}
                    maskClosable={false}
                >
                    <Icon type="loading"/>
                </Modal>
            </Popconfirm>
        </div>
    );
}
