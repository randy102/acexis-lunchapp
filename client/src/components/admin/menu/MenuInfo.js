import React from "react";
import { Alert } from "antd";

export default function MenuInfo() {
    return (
        <div style={{ marginTop: "20px" }}>
            <Alert
                style={{margin: '10px 0'}}
                message="Only one Menu got Published at a time!"
                type="warning"
                showIcon
            />
            <Alert
                style={{margin: '10px 0'}}
                message="If Menu is CLOSED, only USER can not order!"
                type="warning"
                showIcon
            />
            <Alert
                style={{margin: '10px 0'}}
                message="If Menu is BLOCKED, both ADMIN and MOD can not edit MENU or make orders"
                type="warning"
                showIcon
            />
        </div>
    );
}
