import React, { useState } from "react";
import UserGrid from "./user/UserGrid";
import UserAddBtn from "./user/UserAddBtn";
import UserDeleteBtn from "./user/UserDeleteBtn";
import UserEditBtn from "./user/UserEditBtn";
import { Divider, Icon, Result } from "antd";
import { getUser } from "../../services/auth";

export default function User() {
    const [gridApi, setGridApi] = useState(undefined);
    const [doRefetch, setDoRefetch] = useState(true);

    function refetch() {
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
                    <Icon type="user" /> User
                </h1>
            </Divider>

            <UserAddBtn refetch={refetch} />
            <UserDeleteBtn gridApi={gridApi} refetch={refetch} />
            <UserEditBtn gridApi={gridApi} refetch={refetch} />
            <UserGrid setGridApi={setGridApi} doRefetch={doRefetch} />
        </div>
    );
}
