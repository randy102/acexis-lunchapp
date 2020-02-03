import React, { useState, useEffect } from 'react'
import OrderAddBtn from './OrderAddBtn'
import ItemGrid from './ItemGrid';

export default function Menu({orderRefetch, menuRefetch, orderApi}) {
    const [gridApi, setGridApi] = useState(undefined);
    const [doRefetch, setDoRefetch] = useState(true);

    function refetch(){
        setDoRefetch(!doRefetch);
        orderRefetch();
    }

    useEffect(()=>{
        refetch();
    },[menuRefetch])

    return (
        <div>
            <OrderAddBtn gridApi={gridApi} refetch={refetch} orderApi={orderApi}/>
            <ItemGrid setGridApi={setGridApi} doRefetch={doRefetch} height="400px"/>
        </div>
    )
}