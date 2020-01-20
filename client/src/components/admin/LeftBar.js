import React from "react";
import { Menu, Icon, Layout } from "antd";
import { Link } from "react-router-dom";
const { Sider } = Layout;

export default function LeftBar(props) {
   
    const pages = [
        '',
        'user',
        'site',
        'shop',
        'menu',
        'order'
    ];

    const curPath = props.location.pathname.split("/")[2];
    const curKey = String(pages.indexOf(curPath));
   
    return (
        <div id="LeftBarWrap">
            <Sider
                style={{
                    overflow: "auto",
                    height: "100vh",
                    position: "fixed",
                    left: 0,
                    top: 40
                }}
            >
                <Menu theme="dark" mode="inline" selectedKeys={[curKey]}>
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
                </Menu>
            </Sider>
        </div>
    );
}
