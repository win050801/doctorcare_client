import React, { useState, useEffect } from "react";
import "../../components/Getsick/Getsick.scss"
import { Input } from 'antd'
import Listwait from "../Listwait/Listwait";
import Paitent from "../Paitent/Paitent";
import axios from "axios";
import { parseInt } from "lodash";
export default function Getsick({ patient }) {

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
    const [age, setAge] = useState("")
    const [selectValue, setSelectValue] = React.useState(1);
    const [stt, setSTT] = useState(1);
    const [isUutien, setUutien] = useState(0);
    
    useEffect(() => {
        async function fetchData() {
            // You can await here
            //   console.log("test");
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/supports/getSTT"
                );
                setSTT(response.data)
                // console.log(response);
            } catch (error) {
                console.log(error);
            }

            // ...
        }
        fetchData();
    }, []);
    useEffect(() => {
        async function fetchData() {
            if (patient) {
                setName(patient.name)
                setaddress(patient.address)
                setchieuCao(patient.height)
                setcanNang(patient.weight)
                setphoneNumber(patient.phone)
                setAge(patient.age)
            }
        }
        fetchData();
    }, [patient]);
    const handleLogin = async () => {
        console.log(selectValue);

        if (selectValue === 1) {
            try {

                const { data } = await axios.post("http://localhost:8000/api/supports/sendPaitent", {
                    name,
                    gender: 1,
                    weight: canNang,
                    height: chieuCao,
                    address,
                    phone: phoneNumber,
                    email: "",
                    password: "123",
                    address: address,
                    avatar: null,
                    description: "KH",
                    age:age,
                    isActive: 1,
                    isLogin: 1,
                    verifyCode: isUutien,
                    accessToken: "sad",
                    job: null,
                    examninationHistories: [],
                    registration: null,
                    refeshToken: "sda",
                    position: "sad",
                    roleId: 5,
                    updatedAt: null,
                    bloodType: null

                });
                console.log(data);
                setName("")
                setaddress("")
                setphoneNumber("")
                setchieuCao("")
                setcanNang("")
                setSTT(stt + 1)
            } catch (error) {

                console.log("fail");
            }
        }
        if (selectValue === 2) {
            try {
                const { data } = await axios.post("http://localhost:8000/api/supports/sendPaitentSA", {
                    name,
                    gender: 1,
                    weight: canNang,
                    height: chieuCao,
                    address,
                    phone: phoneNumber,
                    email: "",
                    password: "123",
                    address: address,
                    avatar: null,
                    description: "KH",
                    isActive: 1,
                    age:age,
                    isLogin: 1,
                    verifyCode: 1,
                    accessToken: "sad",
                    job: null,
                    examninationHistories: [],
                    registration: null,
                    refeshToken: "sda",
                    position: "sad",
                    roleId: 5,
                    updatedAt: null,
                    bloodType: null
                });
                setName("")
                setaddress("")
                setphoneNumber("")
                setchieuCao("")
                setcanNang("")
                setSTT(stt + 1)
            } catch (error) {

                console.log("fail");
            }
        }

        console.log("value : " + selectValue);
    };

    const onChange = (event) => {
        const value = parseInt(event.target.value);
        setSelectValue(value);
    };
    const changeUT = () => {
        console.log(isUutien);
        if (isUutien === 0) {
            setUutien(1)
        }
        else {
            setUutien(0)
        }
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
                                <div style={{ width: "30%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 30 }}><label style={{ width: 90, fontSize: 13, fontWeight: "bold" }}>Họ tên: </label><Input className="input1" type="text" value={name} onChange={(e) => setName(e.target.value)}  ></Input></div>

                                <div style={{ width: "15%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 30 }}><label style={{ width: 45, fontSize: 13, fontWeight: "bold" }}>Tuổi: </label><Input className="input1" type="number" value={age} onChange={(e) => setAge(e.target.value)} style={{ width: 50, marginLeft: 0, paddingRight: 0 }} ></Input></div>
                                <div style={{ width: "15%", display: "flex", justifyContent: "flex-start", alignItems: "center", }} ><label style={{ width: 70, fontSize: 13, fontWeight: "bold" }}>Giới tính: </label>
                                    <select className="selected" name="gioitinh" id="gioitinh" >
                                        <option value="volvo">Nam</option>
                                        <option value="volvo">Nữ</option>
                                    </select>
                                </div>
                                <div style={{ width: "25%", display: "flex", justifyContent: "center", alignItems: "center" }}><input type="checkbox"></input><label style={{ fontSize: 14, fontWeight: "inherit" }}>Bệnh nhân cũ </label></div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "100%" }}>

                                <div style={{ width: "30%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 30 }}><label style={{ width: 90, fontSize: 13, fontWeight: "bold" }}>Địa chỉ: </label><Input className="input1" type="text" value={address} onChange={(e) => setaddress(e.target.value)}></Input></div>
                                {/* <div style={{ width: "25%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 10 }}><label className="font-label">Tỉnh/TP: </label><Input className="input1" type="text"></Input></div> */}
                                <div style={{ width: "30%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 30 }}><label style={{ width: 150, fontSize: 13, fontWeight: "bold" }}>Số điện thoại: </label><Input className="input1" type="text" value={phoneNumber} onChange={(e) => setphoneNumber(e.target.value)}></Input></div>
                                <div style={{ width: "20%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 30 }}><label style={{ width: 85, fontSize: 13, fontWeight: "bold" }}>Chiều cao : </label>
                                    <Input type="text" className="input2" value={chieuCao} onChange={(e) => setchieuCao(e.target.value)}></Input>
                                </div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "100%" }}>

                                <div style={{ width: "20%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 30 }}><label style={{ width: 65, fontSize: 13, fontWeight: "bold" }}>Cân nặng:</label>
                                    <Input type="text" className="input2" value={canNang} onChange={(e) => setcanNang(e.target.value)}></Input>
                                </div>
                                <div style={{ width: "30%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 30 }}><label className="font-label">Chẩn đoán khoa : </label>
                                    <select className="selected" style={{ marginLeft: 10 }} name="gioitinh" id="gioitinh" onChange={onChange}>

                                        <option value="1"  >Khoa ngoại</option>
                                        <option value="2" >Siêu âm</option>

                                    </select>
                                </div>
                                <div style={{ width: "25%", display: "flex", justifyContent: "center", alignItems: "center" }}><input type="checkbox" onChange={changeUT} ></input><label style={{ fontSize: 14, fontWeight: "inherit" }}>Bệnh nhân ưu tiên </label></div>

                            </div>
                        </div>



                    </div>

                    <div style={{ display: "flex", width: "100%", height: "60vh", flex: 1, flexDirection: 'row' }}>
                        <div style={{ display: "flex", flex: 0.5 }}>
                            <Listwait></Listwait>
                        </div>
                        <div style={{ display: "flex", flex: 0.5 }}>
                            <Paitent handleLogin={handleLogin} stt={stt} setSTT={setSTT}></Paitent>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}