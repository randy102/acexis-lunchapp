import React from "react";
import { Button,Modal} from "antd";

export default function SiteAddBtn(props) {

    return (
        <div className="user-btn">

            <Button type="primary" onClick={props.showModal}>
                {props.btnName}
            </Button>
            
            <Modal
                title="Add Site"
                visible={props.visible}
                onOk={props.handleOk}
                confirmLoading={props.confirmLoading}
                onCancel={props.handleCancel}
            >
                {props.children}
            </Modal>
        </div>
    );
}
