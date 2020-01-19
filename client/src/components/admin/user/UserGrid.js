import React from "react";
import { AgGridReact } from "ag-grid-react";

export default function UserGrid(props) {
    const columnDefs = [
        {
            checkboxSelection: true,
            width: 30
        },
        {
            headerName: "Name",
            field: "name",
            sortable: true,
            
        },
        { headerName: "Site", field: "site", filter: true },
        { headerName: "Role", field: "role" },
        { headerName: "Status", field: "status" }
    ];

    function onReady(param) {
        param.api.sizeColumnsToFit();
        props.setGridApi(param.api)
    }
   
    return (
        <div>
            <div
                className="ag-theme-balham"
                style={{ height: "300px", width: "100%" }}
            >
                <AgGridReact
                    onGridReady={onReady}
                    rowSelection="multiple"
                    columnDefs={columnDefs}
                    rowData={props.data}
                ></AgGridReact>
            </div>
        </div>
    );
}
