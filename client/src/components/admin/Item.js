import React, { useState } from 'react'
import ItemGrid from "./item/ItemGrid"
import ItemAddBtn from './item/ItemAddBtn';
import ItemDeleteBtn from './item/ItemDeleteBtn';
import ItemEditBtn from './item/ItemEditBtn';
import ItemAddFromShop from './item/ItemAddFromShop';
import ItemAddFromExcel from './item/ItemAddFromExcel';
import OrderAddBtn from './order/OrderAddBtn';
import { message } from 'antd';


export default function Item({curMenu,curSite,menuState}) {
    const [gridApi, setGridApi] = useState(undefined);
    const [doRefetch, setDoRefetch] = useState(true);

    function refetch(){
        setDoRefetch(!doRefetch);
    }
   
    function handleClick(e){
        const isBlock = e.target.classList.contains("unclickable");
        if(isBlock)
            message.error("Can not change Items of Blocked Menu")
    }

    return (
        <div  style={{marginTop: "-5px"}} >
            <div onClick={handleClick} className={menuState === "BLOCKED" ? "unclickable" : ""}>
                <ItemAddBtn curMenu={curMenu} refetch={refetch}/>
                <ItemAddFromShop curMenu={curMenu} refetch={refetch}/>
                <ItemAddFromExcel curMenu={curMenu} refetch={refetch}/>
                <OrderAddBtn gridApi={gridApi} curSite={curSite} refetch={refetch}/>
                <ItemDeleteBtn gridApi={gridApi} refetch={refetch}/>
                <ItemEditBtn gridApi={gridApi} refetch={refetch}/>
            </div>
            
            <ItemGrid curMenu={curMenu} setGridApi={setGridApi} doRefetch={doRefetch}/>
        </div>
    )
}
