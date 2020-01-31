import React from "react";
import { Select, Icon } from "antd";
import { useQuery } from "@apollo/client";
import { GET_SITES } from "../../../graphql/site";
const { Option } = Select;

export default function MenuSite(props) {
    const { loading, error, data } = useQuery(GET_SITES);

    function renderOption(data) {
        return data.sites.map(site => (
            <Option key={site["_id"]} value={site["_id"]}>{site["name"]}</Option>
        ));
    }

    
    if (loading)
        return (
            <div>
                <Select
                    name="site"
                    placeholder="Choose site..."
                    suffixIcon={<Icon type="loading" />}
                    style={{width: '100%'}}
                ></Select>
            </div>
        );

    if (error) console.error(error);
    
    return (
        <div>
            <Select
                onChange={value => props.setSite(value)}
                placeholder="Choose site..."
                value={props.site || undefined}
                style={{width: '100%', marginBottom: "5px"}}
            >
                {renderOption(data)}
            </Select>
        </div>
    );
}
