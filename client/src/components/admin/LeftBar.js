import React from "react";
import { Menu, Icon, Layout } from "antd";
import { Link } from "react-router-dom";
import { getUser } from "../../services/auth";
const { Sider } = Layout;

function getKey(path){
    const pages = [
        '',
        'user',
        'site',
        'shop',
        'menu',
        'order',
        'config'
    ];

    const curPath = path.split("/")[2] || "user";
    const curKey = String(pages.indexOf(curPath));
    return [curKey]
}

const leftBarStyle = {
    overflow: "auto",
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 40
}

export default function LeftBar(props) {
   
    return (
        <div id="LeftBarWrap">
            <Sider
                style={leftBarStyle}
            >
                <Menu theme="dark" mode="inline" selectedKeys={getKey(props.location.pathname)}>
                    <div style={{color: "white", padding: "20px 25px", fontWeight: "bold"}}>Hello {getUser("name")}!</div>
                    <Menu.Item key="1">
                        <Link to="/admin/user">
                            <Icon type="user" />
                            <span className="nav-text">User</span>
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="2">
                        <Link to="/admin/site">
                            <Icon type="apartment" />
                            <span className="nav-text">Site</span>
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="3">
                        <Link to="/admin/shop">
                            <Icon type="shop" />
                            <span className="nav-text">Shop</span>
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="4">
                        <Link to="/admin/menu">
                            <Icon type="menu" />
                            <span className="nav-text">Menu</span>
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="5">
                        <Link to="/admin/order">
                            <Icon type="profile" />
                            <span className="nav-text">Order</span>
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="6">
                        <Link to="/admin/config">
                            <Icon type="setting" />
                            <span className="nav-text">Config</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        </div>
    );
}
