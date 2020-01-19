import React from 'react'
import { Layout, Menu, Icon } from "antd";
import {Link} from "react-router-dom";
import { logOut } from '../services/auth';

export default function Header() {
    function handleLogOut(){
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
                                Setting
                            </span>
                        }
                    >
                        
                            <Menu.Item key="setting:1">
                                <Link to="/" replace onClick={handleLogOut}> 
                                    <Icon type="logout" />
                                    Log out
                                </Link>
                            </Menu.Item>
                            
                    </Menu.SubMenu>
                </Menu>
            </Layout.Header>
        </div>
    )
}
