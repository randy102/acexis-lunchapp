import React, { useEffect } from "react";
import Grid from "../admin/custom/Grid";
import { useQuery, useSubscription } from "@apollo/client";

import { GET_USER_MENU, GET_USER_MENU_SUB } from '../../graphql/menu';
import { getUser } from "../../services/auth";

export default function ItemGrid({curMenu, setGridApi, doRefetch, height}) {
    const columnDefs = [
        {checkboxSelection: true,width: 60},
        { headerName: "Name", field: "name"},
        { headerName: "Booked", field: "booked"},
        { headerName: "Total", field: "total"},
    ];
    
    const { data, loading, error, refetch} = useQuery(GET_USER_MENU);

    useEffect(() => {
        refetch();
    }, [doRefetch, curMenu]);
   
    const props = {
        setGridApi,
        columnDefs,
        data,
        loading,
        error,
        height
    }
    
    return (
        <Grid {...props}/>
    )
}
