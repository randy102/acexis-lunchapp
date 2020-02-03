import React, { useState, useEffect } from "react";
import { Upload, Icon, message } from 'antd';
import {getToken} from "../../../services/auth";
import AddBtn from "../custom/AddBtn";

const { Dragger } = Upload;

export default function ItemAddFromExcel({ curMenu, refetch }) {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    function showModal() {
        if (!curMenu) {
            message.error("Must choose a Menu");
            return;
        }
        setVisible(true);
    }

    function handleCancel() {
        setVisible(false);
    }

    function handleOk() {
        message.error("Must choose a file!");
    }

    const props = {
        showModal,
        handleCancel,
        handleOk,
        btnName: "Add From Excel",
        visible,
        confirmLoading
    };

    const uploadProps = {
        name: 'file',
        action: `${process.env.REACT_APP_SERVER || "http://localhost:3001"}/item/uploadexcel?menu=${curMenu}`,
        name:"file",
        headers: {
            authorization: getToken()
        }, 
        accept:".xlsx",
        onChange(info) {
          const { status } = info.file;
          if (status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
            refetch();
            setConfirmLoading(false);
            setVisible(false);

          } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };
    return (
        <AddBtn {...props}>
            <Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">
                    Click or drag file to this area to upload.
                </p>
                <p className="ant-upload-hint">
                    Only support .xlsx file!
                </p>
            </Dragger>
        </AddBtn>
    );
}
