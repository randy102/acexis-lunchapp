import React, { useState } from 'react'
import { Divider, Icon, Result } from 'antd'
import SiteGrid from "./site/SiteGrid"
import SiteAddBtn from './site/SiteAddBtn';
import SiteDeleteBtn from './site/SiteDeleteBtn';
import SiteEditBtn from './site/SiteEditBtn';
import { getUser } from '../../services/auth';

export default function Site() {
    const [gridApi, setGridApi] = useState(undefined);
    const [doRefetch, setDoRefetch] = useState(true);
    
    function refetch(){
        setDoRefetch(!doRefetch);
    }
    
    if (getUser("role") === "MOD") {
        return (
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
            />
        );
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
