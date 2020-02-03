import React, { useState } from "react";
import Grid from "../custom/Grid";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../graphql/user";

export default function UserOption({ setUserId, curSite }) {
    const [gridApi, setGridApi] = useState(undefined);

    const { data, loading, error } = useQuery(GET_USER, {
        variables: {
            site: curSite
        }
    });

    const columnDefs = [
        { checkboxSelection: true, width: 80 },
        { headerName: "Name", field: "name" },
        {
            headerName: "Site",
            suppressSizeToFit: true,
            valueGetter: param => param.data.site.name
        },
        { headerName: "Role", field: "role" },
        { headerName: "Status", field: "status" }
    ];

    function onRowClicked() {
        const selected = gridApi.getSelectedRows();
        if(selected.length > 0){
            const { _id: id } = selected[0];
            setUserId(id);
        }
        else
            setUserId("");
        
    }

    const props = {
        onRowClicked,
        data,
        loading,
        error,
        columnDefs,
        setGridApi,
        height: "200px"
    };
    return <Grid {...props} />;
}
