import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../graphql/user";
import UserGrid from "./user/UserGrid";
import UserAddBtn from "./user/UserAddBtn";
import UserDeleteBtn from "./user/UserDeleteBtn";
import UserEditBtn from "./user/UserEditBtn";
import { Divider, Icon, Modal } from "antd";

export default function User() {
    const [gridApi, setGridApi] = useState(undefined);

    function renderData(users) {
        return users.map(user => {
            const newUser = { ...user };
            newUser.site = user.site.name;
            newUser.siteId = user.site["_id"];
            return newUser;
        });
    }

    const { data, loading, error, refetch } = useQuery(GET_USER, {
        variables: {
            site: ""
        }
    });

    if (loading) {
        return (
            <div>
                <Modal title="Loading..." visible={true} maskClosable={false}>
                    <Icon type="loading" />
                </Modal>
            </div>
        );
    }
    if (error) {
        return <div>Error</div>;
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
            <UserGrid setGridApi={setGridApi} data={renderData(data.users)} />
        </div>
    );
}
