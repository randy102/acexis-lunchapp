import React, { useState } from 'react'
import { Divider, Icon } from 'antd'
import SiteGrid from "./site/SiteGrid"
import SiteAddBtn from './site/SiteAddBtn';
import SiteDeleteBtn from './site/SiteDeleteBtn';
import SiteEditBtn from './site/SiteEditBtn';

export default function Site() {
    const [gridApi, setGridApi] = useState(undefined);
    const [doRefetch, setDoRefetch] = useState(true);

    function refetch(){
        setDoRefetch(!doRefetch);
    }
   
    return (
        <div>
           <Divider>
                <h1>
                    <Icon type="apartment" /> Site
                </h1>
            </Divider>
            <SiteAddBtn refetch={refetch}/>
            <SiteDeleteBtn gridApi={gridApi} refetch={refetch}/>
            <SiteEditBtn gridApi={gridApi} refetch={refetch}/>
            <SiteGrid  setGridApi={setGridApi} doRefetch={doRefetch}/>
        </div>
    )
}
