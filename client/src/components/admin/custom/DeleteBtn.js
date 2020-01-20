import React from 'react'
import { Button,Popconfirm, Icon, Modal } from "antd";

export default function DeleteBtn(props) {
    return (
        <div className="user-btn">
            <Popconfirm
                title={props.confirmTitle}
                onConfirm={props.handleDelete}
                okText="Yes"
                cancelText="No"
            >
                <Button type="danger">{props.btnName}</Button>
                <Modal
                    title="Deleting..."
                    visible={props.visible}
                    maskClosable={false}
                >
                    <Icon type="loading"/>
                </Modal>
            </Popconfirm>
        </div>
    )
}
