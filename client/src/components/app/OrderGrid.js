import React from 'react'
import Grid from "../admin/custom/Grid";

export default function OrderGrid({data,loading,error, setOrderApi}) {
    const columnDefs = [
        {checkboxSelection: true,width: 60},
        { headerName: "Item", field: "item" },
        { headerName: "Quantity", field: "quantity"},
        { headerName: "Note", field: "note" },
        { headerName: "Booked Date", field: "created_date"},
    ];

    const props = {
        setGridApi : setOrderApi,
        loading,
        error,
        columnDefs,
        data,
        pagination: false
    }

    return (
        
            <Grid {...props}/>
      
    )
}
