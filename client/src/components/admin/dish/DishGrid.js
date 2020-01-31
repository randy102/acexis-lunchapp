import React, { useEffect, useState } from "react";
import Grid from "../custom/Grid";
import { useQuery } from "@apollo/client";

import { GET_DISHES } from '../../../graphql/dish';

export default function DishGrid({curShop, setGridApi, doRefetch, multiple, parentDef}) {
   
    const columnDefs = [
        {checkboxSelection: true,width: 30},
        { headerName: "Name", field: "name", sortable: true },
    ];
    
    const { data, loading, error, refetch} = useQuery(GET_DISHES, {variables: {shop: curShop}});

    useEffect(() => {
        refetch();
    }, [doRefetch, curShop]);
    
    const props = {
        setGridApi,
        columnDefs: parentDef || columnDefs,
        data,
        loading,
        error,
        multiple
    }

    return (
        <Grid {...props}/>
    )
}
