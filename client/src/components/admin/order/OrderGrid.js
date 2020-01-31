import React, { useEffect } from "react";
import Grid from "../custom/Grid";
import { GET_ORDERS } from "../../../graphql/order";
import { useQuery } from "@apollo/client";

export default function OrderGrid({ setGridApi, doRefetch}) {
    const columnDefs = [
        {checkboxSelection: true,width: 60},
        { headerName: "User", field: "user"},
        { headerName: "Item", field: "item" },
        { headerName: "Site", field: "site", rowGroup: true },
        { headerName: "Confirm", field: "confirmed", width:100 },
        { headerName: "Quantity", field: "quantity", width:100},
        { headerName: "Note", field: "note" },
        { headerName: "Booked Date", field: "created_date",rowGroup: true, width:120},
    ];

    const { data, loading, error, refetch } = useQuery(GET_ORDERS);

    useEffect(() => {
        refetch();
    }, [doRefetch]);
    
    const props = {
        setGridApi,
        loading,
        error,
        columnDefs,
        data,
        pagination: false
    }

    return (
        <div>
            <Grid {...props}/>
        </div>
    );
}
