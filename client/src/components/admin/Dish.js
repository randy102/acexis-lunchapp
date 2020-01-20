import React, { useState } from 'react'
import DishGrid from "./dish/DishGrid"
import DishAddBtn from './dish/DishAddBtn';
import DishDeleteBtn from './dish/DishDeleteBtn';
import DishEditBtn from './dish/DishEditBtn';

export default function Dish({curShop}) {
    const [gridApi, setGridApi] = useState(undefined);
    const [doRefetch, setDoRefetch] = useState(true);

    function refetch(){
        setDoRefetch(!doRefetch);
    }

    return (
        <div>
            <DishAddBtn curShop={curShop} refetch={refetch}/>
            <DishDeleteBtn gridApi={gridApi} refetch={refetch}/>
            <DishEditBtn gridApi={gridApi} refetch={refetch}/>
            <DishGrid curShop={curShop} setGridApi={setGridApi} doRefetch={doRefetch}/>
        </div>
    )
}
