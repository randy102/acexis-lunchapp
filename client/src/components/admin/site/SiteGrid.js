import React, { useEffect } from "react";
import Grid from "../custom/Grid";
import { useQuery } from "@apollo/client";
import { GET_SITES } from "../../../graphql/site";


export default function SiteGrid({ setGridApi, doRefetch }) {
    const columnDefs = [
        {
            checkboxSelection: true,
            width: 20
        },
        { headerName: "Name", field: "name", sortable: true },
        { headerName: "Members", field: "count", sortable: true }
    ];

    const { data, loading, error, refetch } = useQuery(GET_SITES);

    useEffect(() => {
        refetch();
    }, [doRefetch]);

    
    
    const props = {
        error,
        loading,
        data,
        setGridApi,
        columnDefs,

    }

    return (
        <Grid {...props} />
    );
}
