import React, { useEffect } from "react";
import Grid from "../custom/Grid";
import { GET_SHOPS } from "../../../graphql/shop";
import { useQuery } from "@apollo/client";


export default function ShopGrid({ setGridApi, doRefetch, handleClick}) {
    const columnDefs = [
        {
            checkboxSelection: true,
            width: 30
        },
        { headerName: "Name", field: "name", sortable: true }
    ];

    const { data, loading, error, refetch } = useQuery(GET_SHOPS);

    useEffect(() => {
        refetch();
    }, [doRefetch]);
    
    const props = {
        columnDefs,
        data,
        setGridApi,
        loading,
        error,
        onRowClicked: handleClick
    }

    return (
        <div>
            <Grid {...props} />
        </div>
    );
}
