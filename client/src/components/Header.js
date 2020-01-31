import React from "react";
import { Layout, Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import { logOut } from "../services/auth";

export default function Header() {
    function handleLogOut() {
        logOut();
    }

    return (
        <div>
            <Layout.Header
                style={{
                    position: "fixed",
                    zIndex: 1,
                    width: "100%",
                    height: 40
                }}
            >
                <Menu
                    theme="light"
                    mode="horizontal"
                    style={{ lineHeight: "40px", float: "right" }}
                >
                    <Menu.SubMenu
                        title={
                            <span className="submenu-title-wrapper">
                                <Icon type="setting" />
                                Options
                            </span>
                        }
                    >
                        <Menu.Item key="setting:1">
                            <Link to="/" replace onClick={handleLogOut}>
                                <Icon type="logout" />
                                Log out
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="setting:2">
                            <Link to="/app/password" replace>
                                <Icon type="lock" />
                                Change Password
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="setting:3">
                            <Link to="/app" replace>
                                <Icon type="home" />
                                App
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="setting:4">
                            <Link to="/admin" replace>
                                <Icon type="user" />
                                Admin
                            </Link>
                        </Menu.Item>
                    </Menu.SubMenu>
                </Menu>
            </Layout.Header>
        </div>
    );
}
