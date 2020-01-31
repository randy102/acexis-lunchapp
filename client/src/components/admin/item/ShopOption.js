import React from 'react'
import { Select, Icon } from 'antd'
import { useQuery } from '@apollo/client';
import {GET_SHOPS} from "../../../graphql/shop";
const { Option } = Select;

export default function ShopOption({setShop, shop}) {
    const { loading, error, data } = useQuery(GET_SHOPS);
    
    function renderOption(data) {
        return data.shops.map(shop => (
            <Option key={shop["_id"]} value={shop["_id"]}>{shop["name"]}</Option>
        ));
    }

    if (loading)
        return (
            <div>
                <Select
                    name="site"
                    placeholder="Choose Shop..."
                    suffixIcon={<Icon type="loading" />}
                    style={{width: '100%'}}
                ></Select>
            </div>
        );

    if (error) console.error(error);


    return (
        <div>
            <Select
                placeholder="Choose Shop..."
                onChange={value => setShop(value)}
                value={shop || undefined}
                style={{width: '100%'}}
            >
                 {renderOption(data)}
            </Select>
        </div>
    )
}
