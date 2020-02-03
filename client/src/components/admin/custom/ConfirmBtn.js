import React from 'react'
import { Button,Popconfirm, Icon, Modal } from "antd";

export default function ConfirmBtn(props) {
    return (
        <div className="user-btn">
            <Popconfirm
                title={props.confirmTitle}
                onConfirm={props.handleConfirm}
                okText="Yes"
                cancelText="No"
            >
                <Button type="default">{props.btnName}</Button>
                <Modal
                    title="Confirming..."
                    visible={props.visible}
                    maskClosable={false}
                >
                    <Icon type="loading"/>
                </Modal>
            </Popconfirm>
        </div>
    )
}
