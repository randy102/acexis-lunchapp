import React from 'react'
import { AgGridReact } from "ag-grid-react";

export default function Grid(props) {
    return (
        <div
            className="ag-theme-balham"
            style={{ height: "300px", width: "100%" }}
        >
            <AgGridReact
                onGridReady={props.onReady}
                columnDefs={props.columnDefs}
                rowData={props.data}
                onRowSelected={props.onRowClicked ? props.onRowClicked : undefined}
            ></AgGridReact>
        </div>
    )
}
