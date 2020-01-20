import React from 'react'
import { Button,Modal } from "antd";

export default function EditBtn(props) {
    return (
        <div className="user-btn">
            <Button type="ghost" onClick={props.handleEdit}>
                {props.btnName}
            </Button>
            <Modal
                title={props.btnName}
                visible={props.visible}
                onOk={props.handleOk}
                confirmLoading={props.confirmLoading}
                onCancel={() => props.setVisible(false)}
            >
                {props.children}
            </Modal>
        </div>
    )
}
