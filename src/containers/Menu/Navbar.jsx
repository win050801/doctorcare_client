import React from "react";
import "../../containers/Menu/Navbar.scss"
import { ImportOutlined, CalendarOutlined, MessageOutlined, ProfileOutlined } from "@ant-design/icons";
import "../Users/User"
import User from "../Users/User";
import { set } from "lodash";
export default function Navbar(props) {

    const setdata1 = (index) => {
        props.setdata(index);
    }

    const items = [
        { label: "Tiếp nhận bệnh nhân", icon: <ImportOutlined style={{ color: "white", paddingLeft: 5 }}></ImportOutlined> },
        { label: "Lịch bác sĩ", icon: <CalendarOutlined style={{ color: "white", paddingLeft: 5 }} /> },
        { label: "Đặt trực tuyến", icon: <MessageOutlined style={{ color: "white", paddingLeft: 5 }} /> },
        { label: "Hồ sơ bệnh nhân", icon: <ProfileOutlined style={{ color: "white", paddingLeft: 5 }} /> }
    ]
    return (
        <div className="navbar">
            <User></User>
            <div style={{ height: '60vh' }}>
                {items.map((item, index) => {
                    return (
                        <div className="submenu" onClick={ ()=>setdata1(index)  }>
                            {item.icon}
                            <span style={{ fontSize: 15, color: 'white', paddingLeft: 10 }}>
                                {item.label}
                            </span>

                        </div>
                    )
                })}
            </div>
        </div>
    )
}