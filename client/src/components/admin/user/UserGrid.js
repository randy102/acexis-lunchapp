import React, { useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../graphql/user";
import { Modal, Icon } from "antd";

export default function UserGrid({doRefetch, setGridApi}) {
    const columnDefs = [
        {
            checkboxSelection: true,
            width: 30
        },
        {
            headerName: "Name",
            field: "name",
            sortable: true,
            
        },
        { headerName: "Site", field: "site",  sortable: true, },
        { headerName: "Role", field: "role" , sortable: true,},
        { headerName: "Status", field: "status" , sortable: true,}
    ];

    function onReady(param) {
        param.api.sizeColumnsToFit();
        setGridApi(param.api)
    }

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

    useEffect(() => {
       refetch();
    }, [doRefetch]);


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
            <div
                className="ag-theme-balham"
                style={{ height: "300px", width: "100%" }}
            >
                <AgGridReact
                    onGridReady={onReady}
                    rowSelection="multiple"
                    columnDefs={columnDefs}
                    rowData={renderData(data.users)}
                ></AgGridReact>
            </div>
        </div>
    );
}
