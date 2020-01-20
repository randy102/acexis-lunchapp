import React, { useState } from "react";
import { Divider, Icon, Row, Col } from "antd";
import ShopGrid from "./shop/ShopGrid";
import ShopDeleteBtn from "./shop/ShopDeleteBtn";
import ShopEditBtn from "./shop/ShopEditBtn";
import Dish from "./Dish";
import ShopAddBtn from "./shop/ShopAddBtn";

export default function Shop() {
    const [shopApi, setShopApi] = useState(undefined);
    const [doRefetch, setDoRefetch] = useState(true);
    const [curShop, setCurShop] = useState("");

    function shopRefetch() {
        setDoRefetch(!doRefetch);
    }

    function handleShopClick() {
        let selected = shopApi.getSelectedRows();

        if (selected.length > 0) {
            setCurShop(selected[0]["_id"]);
        } else {
            setCurShop("");
        }
    }

    return (
        <div>
            <Divider>
                <h1>
                    <Icon type="shop" /> Shop
                </h1>
            </Divider>
            <Row>
                <Col span={11}>
                    <ShopAddBtn refetch={shopRefetch} />
                    <ShopDeleteBtn gridApi={shopApi} refetch={shopRefetch} />
                    <ShopEditBtn gridApi={shopApi} refetch={shopRefetch} />
                    <ShopGrid
                        handleClick={handleShopClick}
                        setGridApi={setShopApi}
                        doRefetch={doRefetch}
                    />
                </Col>
                <Col span={11} offset={2}>
                    <Dish curShop={curShop} />
                </Col>
            </Row>
        </div>
    );
}
