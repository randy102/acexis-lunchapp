import React from "react";
import { Select, Icon } from "antd";
import { useQuery } from "@apollo/client";
import { GET_SITES } from "../../../graphql/site";
const { Option } = Select;

export default function SiteOption(props) {
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
                ></Select>
            </div>
        );

    if (error) console.error(error);
    
    return (
        <div>
            <Select
                onChange={value => props.setSite(value)}
                name="site"
                placeholder="Choose site..."
                value={props.site || undefined}
            >
                {renderOption(data)}
            </Select>
        </div>
    );
}
