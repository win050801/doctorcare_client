import React, { useState } from "react";
import "../../components/Getsick/Getsick.scss"
import { Input } from 'antd'
import Listwait from "../Listwait/Listwait";
import Paitent from "../Paitent/Paitent";
import axios from "axios";
import { parseInt } from "lodash";
export default function Getsick() {

    // const [infoPatient,setinfoPatient]= useState({name:"",dateofbirth:"",isOldPatient:0,gender:0,address:"",phoneNumber:""})
    const [name, setName] = useState("")
    const [dateofbirth, setdateofbirth] = useState("")
    const [isOldPatient, setisOldPatient] = useState()
    const [gender, setgender] = useState()
    const [address, setaddress] = useState("")
    const [phoneNumber, setphoneNumber] = useState("")
    const [chieuCao, setchieuCao] = useState("")
    const [canNang, setcanNang] = useState("")
    const [Khoa, setKhoa] = useState(1)
    const [selectValue, setSelectValue] = React.useState(1);
    const handleLogin = async () => {
        console.log(selectValue);

        if (selectValue === 1) {
            try {
                const { data } = await axios.post("http://localhost:8000/sendPaitent", {
                    name,
                    gender: gender,
                    weight: canNang,
                    height: chieuCao,
                    address,
                    phone: phoneNumber
                });
                console.log(data);
                setName("")
                setaddress("")
                setphoneNumber("")
                setchieuCao("")
                setcanNang("")
            } catch (error) {

                console.log("fail");
            }
        }
        if (selectValue === 2) {
            try {
                const { data } = await axios.post("http://localhost:8000/sendPaitentSA", {
                    name,
                    gender: gender,
                    weight: canNang,
                    height: chieuCao,
                    address,
                    phone: phoneNumber
                });
                console.log(data);
                setName("")
                setaddress("")
                setphoneNumber("")
                setchieuCao("")
                setcanNang("")
            } catch (error) {

                console.log("fail");
            }
        }


    };

    const onChange = (event) => {
        const value = parseInt(event.target.value);
        setSelectValue(value);
    };


    return (
        <div className="getsick">
            <div className="containergetsick">
                <div className="info">
                    <div style={{ display: "flex", width: "100%", height: 200, flexDirection: "column" }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ fontSize: 15, fontWeight: "bold", color: "red", margin: 15 }}>Thông tin bệnh nhân</span>

                        </div>


                        <div style={{ display: "flex", width: "100%", height: "100%", flexDirection: "column", justifyContent: "space-between" }}>
                            <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "100%" }}>
                                <div style={{ width: "25%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 30 }}><label className="font-label">Họ tên: </label><input className="input1" type="text" value={name} onChange={(e) => setName(e.target.value)}  ></input></div>
                                <div style={{ width: "25%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 10 }}><label className="font-label">Ngày sinh: </label><input className="input1" type="text" onChange={(e) => setdateofbirth(e.target.value)}></input></div>
                                <div style={{ width: "25%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 10 }}><label className="font-label">Tuổi: </label><input className="input1" type="text" ></input></div>
                                <div style={{ width: "25%", display: "flex", justifyContent: "center", alignItems: "center" }}><input type="checkbox"></input><label style={{ fontSize: 14, fontWeight: "inherit" }}>Bệnh nhân cũ </label></div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "100%" }}>
                                <div style={{ width: "15%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 30 }} ><label className="font-label">Giới tính: </label>
                                    <select className="input1" name="gioitinh" id="gioitinh">

                                        <option value="volvo">Nam</option>
                                        <option value="volvo">Nữ</option>

                                    </select>
                                </div>
                                <div style={{ width: "25%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 10 }}><label className="font-label">Địa chỉ: </label><input className="input1" type="text" value={address} onChange={(e) => setaddress(e.target.value)}></input></div>
                                <div style={{ width: "25%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 10 }}><label className="font-label">Tỉnh/TP: </label><input className="input1" type="text"></input></div>
                                <div style={{ width: "30%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 10 }}><label className="font-label">Số điện thoại: </label><input className="input1" type="text" value={phoneNumber} onChange={(e) => setphoneNumber(e.target.value)}></input></div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "100%" }}>
                                <div style={{ width: "20%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 30 }}><label className="font-label">Chiều cao : </label>
                                    <input type="text" className="input2" value={chieuCao} onChange={(e) => setchieuCao(e.target.value)}></input>
                                </div>
                                <div style={{ width: "20%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 30 }}><label className="font-label">Cân nặng : </label>
                                    <input type="text" className="input2" value={canNang} onChange={(e) => setcanNang(e.target.value)}></input>
                                </div>
                                <div style={{ width: "30%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 30 }}><label className="font-label">Chẩn đoán khoa : </label>
                                    <select className="input1" name="gioitinh" id="gioitinh" onChange={onChange}>

                                        <option value="1"  >Khoa ngoại</option>
                                        <option value="2" >Siêu âm</option>

                                    </select>
                                </div>
                                <div style={{ width: "30%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 10 }}><label className="font-label">Bác sĩ chỉ định : </label>
                                    <select className="input1" name="gioitinh" id="gioitinh">

                                        <option value="volvo">Đào Cao Thắng</option>
                                        <option value="volvo">Phan Nguyễn Tấn Trọng</option>

                                    </select>
                                </div>

                            </div>
                        </div>



                    </div>

                    <div style={{ display: "flex", width: "100%", height: "60vh", flex: 1, flexDirection: 'row' }}>
                        <div style={{ display: "flex", flex: 0.5 }}>
                            <Listwait></Listwait>
                        </div>
                        <div style={{ display: "flex", flex: 0.5 }}>
                            <Paitent handleLogin={handleLogin}></Paitent>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}