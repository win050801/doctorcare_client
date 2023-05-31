import React from "react";
import { useState, useEffect } from "react";
import "../../containers/Users/User.scss"
import { Avatar, Dropdown, Space, Modal,Image } from "antd";
// const {  DownOutlined, SmileOutlined  } = icons;
export default function User() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState({avatar:"",name:""});
    const [avatar,setAvatar] = useState("")
    const[chucVu,setChucVu] = useState("")
    // const { navigate } = this.props;
    const showModal = () => {
      
        setIsModalOpen(true);

    };
    const handleOk = async () => {

        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const redirectPath = '/login';
    
    useEffect(() => {
        const timer = setTimeout(() => {
            async function fetchData() {
               if(localStorage.getItem("currentUser"))
               {
                 setUser(JSON.parse(localStorage.getItem("currentUser")))
                //  setAvatar(new Buffer(JSON.parse(localStorage.getItem("currentUser")).avatar, 'base64').toString('binary'))
                 if(JSON.parse(localStorage.getItem("currentUser")).roleId===1)
                 {
                    setChucVu("Bác sĩ khoa ngoại")
                 }
                 else if(JSON.parse(localStorage.getItem("currentUser")).roleId===2)
                 {
                    setChucVu("Dược sĩ")
                 }
                 else if(JSON.parse(localStorage.getItem("currentUser")).roleId===3)
                 {
                    setChucVu("Lễ Tân")
                 }
                 else if(JSON.parse(localStorage.getItem("currentUser")).roleId===6)
                 {
                    setChucVu("Bác sĩ siêu âm")
                 }
               }
               
               else{
                // navigate(`${redirectPath}`);
               }
            }
            fetchData();
        }, 0);
        return () => clearTimeout(timer);
    }, []);
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
                    <div style={{ width: 50, height: 100 }}><Avatar style={{ width: 50, height: 50 }} src={avatar} /></div>
                </Space>
            </Dropdown>
            <div className="user-1">
                <span style={{ fontSize: 15, color: "white", fontWeight: "bold" }}>{user.name}</span>
                <span style={{ fontSize: 14, color: "white" }}>{chucVu}</span>
            </div>
            <Modal title="Thông tin cá nhân" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div style={{ width: "100%", display: "flex", justifyContent: "flex-start", alignItems: "flex-start", paddingLeft: 30, flexDirection: "column" }}>
                    
                </div>
            </Modal>

        </div>

    )
}