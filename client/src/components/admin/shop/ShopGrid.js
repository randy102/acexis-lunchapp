import React, { useEffect } from "react";
import Grid from "../custom/Grid";
import { GET_SHOPS } from "../../../graphql/shop";
import { useQuery } from "@apollo/client";
import { Icon } from "antd";

export default function ShopGrid({ setGridApi, doRefetch, handleClick}) {
    const columnDefs = [
        {
            checkboxSelection: true,
            width: 30
        },
        { headerName: "Name", field: "name", sortable: true }
    ];

    function onReady(param) {
        param.api.sizeColumnsToFit();
        setGridApi(param.api);
    }

   

    const { data, loading, error, refetch } = useQuery(GET_SHOPS);

    useEffect(() => {
        refetch();
    }, [doRefetch]);

    if (loading)
        return (
            <div>
                <Icon type="loading" />
            </div>
        );

    if (error) return <div>Error</div>;
    
    const props = {
        onReady,
        columnDefs,
        data: data.shops
    }

    return (
        <div>
            <Grid {...props} onRowClicked={handleClick}/>
        </div>
    );
}
