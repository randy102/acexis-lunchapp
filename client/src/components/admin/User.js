import React, { useState } from "react";
import UserGrid from "./user/UserGrid";
import UserAddBtn from "./user/UserAddBtn";
import UserDeleteBtn from "./user/UserDeleteBtn";
import UserEditBtn from "./user/UserEditBtn";
import { Divider, Icon } from "antd";


export default function User() {
    const [gridApi, setGridApi] = useState(undefined);
    const [doRefetch, setDoRefetch] = useState(true);

    function refetch(){
        setDoRefetch(!doRefetch);
    }

    return (
        <div>
            <Divider>
                <h1>
                    <Icon type="user" /> User
                </h1>
            </Divider>
            
                <UserAddBtn refetch={refetch}/>
                <UserDeleteBtn gridApi={gridApi} refetch={refetch} />
                <UserEditBtn gridApi={gridApi} refetch={refetch}/>
                <UserGrid  setGridApi={setGridApi} doRefetch={doRefetch}/>
           
        </div>
    );
}
