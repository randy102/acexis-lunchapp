import React, { useEffect } from "react";
import Grid from "../custom/Grid";
import { useQuery } from "@apollo/client";

import { GET_ITEMES } from '../../../graphql/item';

export default function ItemGrid({curMenu, setGridApi, doRefetch}) {
    const columnDefs = [
        {checkboxSelection: true,width: 80},
        { headerName: "Name", field: "name"},
        { headerName: "Currently Booked", field: "booked"},
        { headerName: "Total", field: "total"},
        { headerName: "Cancelled", field: "cancelled"},
        { headerName: "Shop", field: "shop"},
    ];
    
    const { data, loading, error, refetch} = useQuery(GET_ITEMES, {variables: {menu: curMenu}});

    useEffect(() => {
        refetch();
    }, [doRefetch, curMenu]);

    const props = {
        setGridApi,
        columnDefs,
        data,
        loading,
        error
    }

    return (
        <Grid {...props}/>
    )
}
