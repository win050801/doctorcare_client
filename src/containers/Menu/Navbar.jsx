import React from "react";
import "../../containers/Menu/Navbar.scss"
import { ImportOutlined, CalendarOutlined, SettingOutlined, LinkOutlined, MessageOutlined, ProfileOutlined, AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import "../Users/User"
import User from "../Users/User";

import { Divider, Menu, Switch } from "antd";
import { useState,useEffect } from "react";
// import { set } from "lodash";
import { Avatar, Dropdown, Space, Modal } from "antd";
export default function Navbar(props) {
    const [mode, setMode] = useState('inline');
    const [theme, setTheme] = useState('light');
    const [user, setUser] = useState({ avatar: "", name: "" });

    const setdata1 = (index) => {
        props.setdata(index);
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            async function fetchData() {
                if (localStorage.getItem("currentUser")) {
                    setUser(JSON.parse(localStorage.getItem("currentUser")))
                    //  setAvatar(new Buffer(JSON.parse(localStorage.getItem("currentUser")).avatar, 'base64').toString('binary'))
                }

                else {
                    // navigate(`${redirectPath}`);
                }
            }
            fetchData();
        }, 0);
        return () => clearTimeout(timer);
    }, []);


    const items = [
        { label: "Tiếp nhận bệnh nhân", icon: <ImportOutlined style={{ color: "white", paddingLeft: 5 }}></ImportOutlined> ,link:"LeTan"},
        { label: "Khám bệnh", icon: <CalendarOutlined style={{ color: "white", paddingLeft: 5 }} /> ,link:"Doctors"},
        { label: "Siêu âm", icon: <MessageOutlined style={{ color: "white", paddingLeft: 5 }} />,link:"DoctorsSA" },
        { label: "Hồ sơ bệnh nhân", icon: <ProfileOutlined style={{ color: "white", paddingLeft: 5 }} />,link:"/info" },
        { label: "Quản lý người dùng", icon: <ProfileOutlined style={{ color: "white", paddingLeft: 5 }} />,link:"/manage-user"  },
        { label: "Kho thuốc", icon: <ProfileOutlined style={{ color: "white", paddingLeft: 5 }} />,link:"/pharmacist"  },
        {
            menucon: <>
                <ProfileOutlined style={{ color: "white", paddingLeft: 5 }} />
                <nav role="navigation" style={{ width: 150, height: 24 }}>
                    <ul>
                        <li style={{ width: "100%" }}><span style={{ fontSize: 15, color: "white" }}>Báo cáo</span>
                            <ul class="dropdown" style={{ width: 200 }}>
                                <li>
                                    <div style={{ width: 200, height: 30 }}>
                                        <a href="http://localhost:3000/report-patient-list" style={{ fontSize: 15, color: "white", textDecoration: "none" }}>Bệnh nhân</a>
                                    </div>
                                </li>
                                <li>
                                    <div style={{ width: 200, height: 30 }}>
                                        <a href="http://localhost:3000/report-export" style={{ fontSize: 15, color: "white", textDecoration: "none" }}>Thuốc sử dụng nhiều</a>
                                    </div>
                                </li>
                                <li>
                                    <div style={{ width: 200, height: 30 }}>
                                        <a href="http://localhost:3000/report" style={{ fontSize: 15, color: "white", textDecoration: "none" }}>Báo cáo thu chi</a>
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
                            <div className="submenu" >
                                
                                {item.icon}
                                {item.menucon}
                                <a href={item.link} style={{ fontSize: 15, color: 'white', paddingLeft: 10 }}>
                                    {item.label}
                                </a>

                            </div>

                        </div>
                    )
                })}
            </div>

        </div>
    )
}                          