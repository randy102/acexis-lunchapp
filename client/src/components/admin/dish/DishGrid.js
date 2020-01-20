import React, { useEffect } from "react";
import Grid from "../custom/Grid";
import { useQuery, useLazyQuery } from "@apollo/client";
import { Icon } from "antd";
import { GET_DISHES } from '../../../graphql/dish';

export default function DishGrid({curShop, setGridApi, doRefetch}) {
    const columnDefs = [
        {checkboxSelection: true,width: 30},
        { headerName: "Name", field: "name", sortable: true },
    ];

    function onReady(param) {
        param.api.sizeColumnsToFit();
        setGridApi(param.api);
    }
    
    const { data, loading, error, refetch} = useQuery(GET_DISHES, {variables: {shop: curShop}});

    useEffect(() => {
        //loadDishes();
        refetch();
    }, [doRefetch, curShop]);

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
        data: data ? data.dishes : []
    }

    return (
        <Grid {...props}/>
    )
}
