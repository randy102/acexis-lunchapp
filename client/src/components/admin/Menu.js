import React, { useState } from "react";
import { Divider, Icon, Row, Col, Form, Alert } from "antd";
import MenuGrid from "./menu/MenuGrid";
import MenuDeleteBtn from "./menu/MenuDeleteBtn";
import MenuEditBtn from "./menu/MenuEditBtn";
import Item from "./Item";
import MenuAddBtn from "./menu/MenuAddBtn";
import MenuSite from "./menu/MenuSite";
import MenuInfo from "./menu/MenuInfo";

export default function Menu() {
    const [gridApi, setMenuApi] = useState(undefined);
    const [doRefetch, setDoRefetch] = useState(true);
    const [curMenu, setCurMenu] = useState("");
    const [menuState, setMenuState] = useState("");
    const [site, setSite] = useState("");

    function menuRefetch() {
        setDoRefetch(!doRefetch);
    }

    function handleMenuClick() {
        let selected = gridApi.getSelectedRows();
        
        if (selected.length > 0) {
            setCurMenu(selected[0]['_id']);
            setMenuState(selected[0]['status']);
        } else {
            setCurMenu("");
            setMenuState("");
        }
    }

    return (
        <div>
            <Divider>
                <h1>
                    <Icon type="menu" /> Menu
                </h1>
            </Divider>
            <Row>
                <Col span={11}>
                    <MenuSite site={site} setSite={setSite} />
                    <MenuAddBtn gridApi={gridApi} site={site} refetch={menuRefetch} />
                    <MenuDeleteBtn
                        setCurMenu={setCurMenu}
                        gridApi={gridApi}
                        refetch={menuRefetch}
                    />
                    <MenuEditBtn gridApi={gridApi} refetch={menuRefetch} />
                    <MenuGrid
                        handleClick={handleMenuClick}
                        setGridApi={setMenuApi}
                        doRefetch={doRefetch}
                        site={site}
                    />
                    <MenuInfo/>
                </Col>
                <Col span={11} offset={2}>
                    <Item curMenu={curMenu} menuState={menuState} curSite={site}/>
                </Col>
            </Row>
        </div>
    );
}
