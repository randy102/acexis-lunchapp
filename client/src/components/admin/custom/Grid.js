import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";

export default function Grid(props) {
    const [api, setApi] = useState(undefined);

    const defaultColDef = {
        filter: true, // set filtering on for all cols,
        sortable: true,
        resizable: true
    };

    function onReady(param) {
        param.api.sizeColumnsToFit();
        setApi(param.api);
        if(props.setGridApi) props.setGridApi(param.api);
    }
    
    if (api) {
        if (props.loading) api.showLoadingOverlay();//When loading

        else if (props.error) console.error(props.error); //When error

        else { //When data loaded
            api.hideOverlay(); 
            if(Object.values(props.data)[0].length == 0) //If data is empty
                api.showNoRowsOverlay();
        }
    }

    return (
        <div
            className="ag-theme-balham"
            style={{ height: props.height || "450px", width: "100%" }}
        >
            <AgGridReact
                rowSelection={props.multiple ? "multiple" : "single"}
                onGridReady={onReady}
                columnDefs={props.columnDefs}
                rowData={props.data ? Object.values(props.data)[0] : []} //Get first property of data object
                onRowSelected={props.onRowClicked || undefined}
                pagination={props.pagination || false}
                paginationPageSize={props.pageSize || undefined}
                defaultColDef={defaultColDef}
            ></AgGridReact>
        </div>
    );
}
