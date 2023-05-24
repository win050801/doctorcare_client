import React from "react";
import "../../containers/Menu/Navbar.scss"
import { ImportOutlined, CalendarOutlined, SettingOutlined, LinkOutlined, MessageOutlined, ProfileOutlined, AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import "../Users/User"
import User from "../Users/User";

import { Divider, Menu, Switch } from "antd";
import { useState } from "react";
// import { set } from "lodash";
import { Avatar, Dropdown, Space, Modal } from "antd";
export default function Navbar(props) {
    const [mode, setMode] = useState('inline');
    const [theme, setTheme] = useState('light');

    
    const setdata1 = (index) => {
        props.setdata(index);
    }
    
    const items = [
        { label: "Tiếp nhận bệnh nhân", icon: <ImportOutlined style={{ color: "white", paddingLeft: 5 }}></ImportOutlined> },
        { label: "Khám bệnh", icon: <CalendarOutlined style={{ color: "white", paddingLeft: 5 }} /> },
        { label: "Siêu âm", icon: <MessageOutlined style={{ color: "white", paddingLeft: 5 }} /> },
        { label: "Hồ sơ bệnh nhân", icon: <ProfileOutlined style={{ color: "white", paddingLeft: 5 }} /> },
        { label: "Quản lý người dùng", icon: <ProfileOutlined style={{ color: "white", paddingLeft: 5 }} /> },
        { label: "Kho thuốc", icon: <ProfileOutlined style={{ color: "white", paddingLeft: 5 }} /> },
        {
            menucon: <>
                <ProfileOutlined style={{ color: "white", paddingLeft: 5 }} />
                <nav role="navigation" style={{ width: 150, height: 24 }}>
                    <ul>
                        <li style={{ width: "100%" }}><span style={{ fontSize: 15, color: "white" }}>Báo cáo</span>
                            <ul class="dropdown" style={{ width: 200 }}>
                                <li>
                                    <div style={{ width: 200, height: 30 }}>
                                        <a href="#" style={{ fontSize: 15, color: "white", textDecoration: "none" }}>Bệnh nhân</a>
                                    </div>
                                </li>
                                <li>
                                    <div style={{ width: 200, height: 30 }}>
                                        <a href="#" style={{ fontSize: 15, color: "white", textDecoration: "none" }}>Kho thuốc</a>
                                    </div>
                                </li>
                                <li>
                                    <div style={{ width: 200, height: 30 }}>
                                        <a href="#" style={{ fontSize: 15, color: "white", textDecoration: "none" }}>Thuốc sử dụng nhiều</a>
                                    </div>
                                </li>
                                <li>
                                    <div style={{ width: 200, height: 30 }}>
                                        <a href="#" style={{ fontSize: 15, color: "white", textDecoration: "none" }}>Báo cáo thu chi</a>
                                    </div>
                                </li>
                                <li>
                                    <div style={{ width: 200, height: 30 }}>
                                        <a href="#" style={{ fontSize: 15, color: "white", textDecoration: "none" }}>Hoạt động nhân viên</a>
                                    </div>
                                </li>
                            </ul>
                        </li>

                    </ul>
                </nav>
            </>,


        }
    ]

    return (
        <div className="navbar">
            <User></User>
            <div style={{ height: '60vh' }}>
                {items.map((item, index) => {
                    return (
                        <div>
                            <div className="submenu" onClick={() => setdata1(index)}>
                                {item.icon}
                                {item.menucon}


                                <span style={{ fontSize: 15, color: 'white', paddingLeft: 10 }}>
                                    {item.label}

                                </span>

                            </div>

                        </div>
                    )
                })}
            </div>

        </div>
    )
}