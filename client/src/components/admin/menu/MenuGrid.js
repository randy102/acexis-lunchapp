import React, { useEffect } from "react";
import Grid from "../custom/Grid";
import { GET_MENUS } from "../../../graphql/menu";
import { useQuery } from "@apollo/client";
import { Icon } from "antd";

export default function MenuGrid({ setGridApi, doRefetch, handleClick, site}) {
    const columnDefs = [
        {checkboxSelection: true,width: 60},
        { headerName: "Name", field: "name",suppressSizeToFit: true },
        { headerName: "Status", field: "status" },
        { headerName: "Created", field: "created_date"},
    ];

    const { data, loading, error, refetch } = useQuery(GET_MENUS, {variables: {site}} );

    useEffect(() => {
        refetch();
    }, [doRefetch, site]);
    
    const props = {
        setGridApi,
        loading,
        error,
        columnDefs,
        data,
        onRowClicked: handleClick,
        pagination: false
    }

    return (
        <div>
            <Grid {...props}/>
        </div>
    );
}
