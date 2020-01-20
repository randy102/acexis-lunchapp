import React, { useEffect, useState } from "react";
import { Button, message, Popconfirm, Icon, Modal } from "antd";
import { useMutation } from "@apollo/client";
import { DELETE_SITE } from "../../../graphql/site";

export default function SiteDeleteBtn({gridApi, refetch}) {
    const [visible, setVisible] = useState(false);
    const [deleteSite, { data }] = useMutation(DELETE_SITE);

    function handleDelete() {
        const selected = gridApi.getSelectedRows();

        if (selected.length > 0) {
            const { _id: id } = selected[0];
            deleteSite({ variables: { id } });
            setVisible(true);
        } else {
            message.error("Must choose a Site!");
        }
    }
    
    
    useEffect(() => {
        refetch();
        setVisible(false);
    }, [data]);


    return (
        <div className="user-btn">
            <Popconfirm
                title="Are you sure delete this Site? This action will delete all the user of this Site!"
                onConfirm={handleDelete}
                okText="Yes"
                cancelText="No"
            >
                <Button type="danger">Delete Site</Button>
                <Modal
                    title="Deleting..."
                    visible={visible}
                    maskClosable={false}
                >
                    <Icon type="loading"/>
                </Modal>
            </Popconfirm>
        </div>
    )
}
