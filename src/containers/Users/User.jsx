import React from "react";
import { useState, useEffect } from "react";
import "../../containers/Users/User.scss"
import { Avatar, Dropdown, Space, Modal } from "antd";
// const {  DownOutlined, SmileOutlined  } = icons;
export default function User() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const showModal = () => {
      
        setIsModalOpen(true);

    };
    const handleOk = async () => {

        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const items = [
        {
            key: '1',
            label: (
                <span onClick={showModal}>
                    Thông tin cá nhân
                </span>
            ),
        },
        {
            key: '2',
            label: (
                <span>
                    Đăng xuất
                </span>
            ),
            // disabled: true,
        },

    ];
    return (
        <div className="users">

            <Dropdown

                menu={{
                    items,
                }}
            >
                <Space style={{ paddingTop: 70, cursor: "pointer" }}>
                    <div style={{ width: 50, height: 100 }}><Avatar style={{ width: 50, height: 50 }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiMlwol7rv8v5Pow3aHCKBItnQ6MjlvUknvA&usqp=CAU" /></div>
                </Space>
            </Dropdown>
            <div className="user-1">
                <span style={{ fontSize: 15, color: "white", fontWeight: "bold" }}>Dao Cao Thang</span>
                <span style={{ fontSize: 14, color: "white" }}>online</span>
            </div>
            <Modal title="Thông tin cá nhân" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div style={{ width: "100%", display: "flex", justifyContent: "flex-start", alignItems: "flex-start", paddingLeft: 30, flexDirection: "column" }}>
                    
                </div>
            </Modal>

        </div>

    )
}