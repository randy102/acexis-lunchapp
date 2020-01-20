import React, { useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { useQuery } from "@apollo/client";
import { GET_SITES } from "../../../graphql/site";
import { Modal, Icon } from "antd";

export default function SiteGrid({ setGridApi, doRefetch }) {
    const columnDefs = [
        {
            checkboxSelection: true,
            width: 20
        },
        { headerName: "Name", field: "name", sortable: true },
        { headerName: "Members", field: "count", sortable: true }
    ];

    function onReady(param) {
        param.api.sizeColumnsToFit();
        setGridApi(param.api);
    }
    const { data, loading, error, refetch } = useQuery(GET_SITES);

    useEffect(() => {
        refetch();
    }, [doRefetch]);

    if (loading)
        return (
            <div>
                <Modal title="Loading..." visible={true} maskClosable={false}>
                    <Icon type="loading" />
                </Modal>
            </div>
        );

    if (error) return <div>Error</div>;

    return (
        <div
            className="ag-theme-balham"
            style={{ height: "300px", width: "100%" }}
        >
            <AgGridReact
                onGridReady={onReady}
                rowSelection="multiple"
                columnDefs={columnDefs}
                rowData={data.sites}
            ></AgGridReact>
        </div>
    );
}
