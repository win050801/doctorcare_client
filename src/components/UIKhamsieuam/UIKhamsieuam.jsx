import { Button, Table, Image, Input, Modal } from "antd"
import "../../components/UIKhamsieuam/UIKhamsieuam.scss"
import axios from "axios";
import CommonUtils from "../../../src/utils/CommonUtils";
import { useEffect, useState } from "react"
export default function UIKhamSieuam({ patient,setPatient }) {
    const { TextArea } = Input;
    const [previewImgUrl, setPreviewImgUrl] = useState("");
    const [avatar, setAvatar] = useState('');
    const [ketLuan,setKetLuan] = new useState('')
    const user = JSON.parse(localStorage.getItem("currentUser"))
    const handleOnChangeImage = async (event) => {
        const file = event.target.files[0];
        console.log(file);
        if (file) {
            let base64 = await CommonUtils.getBast64(file);
            const objectUrl = URL.createObjectURL(file);
            setPreviewImgUrl(objectUrl);
            setAvatar(base64)
        }
    };

    const handleSubmit = async () => {
        try {
            const { data } = await axios.post("http://localhost:9000/api/doctors/saveSieuAm", {
                code: "1",
                amount: 1.0,
                discountPercent: 0,
                discountAmount: 0,
                totalAmount: 0,
                type: 0,
                status: 0,
                receiptNumberNo: 1,
                iscountType: 0,
                description: ketLuan,
                employee: null,
                examninationHistory: {
                    patient:
                    {
                        id: patient.id
                    },
                    doctor:
                    {
                        id: user.id
                    }
                },
                services: [],

                createdAt: null,
                updatedAt: null
            });
            const formData = new FormData();
            formData.append('id', data);
            formData.append('avatar', avatar);
            const res = await axios.post('http://localhost:9000/api/doctors/upload-avatar', formData, {
                headers: {
                    Authorization: 'eyJ1c2VyX2lkIjoxLCJwaG9uZSI6IjA5MTE3NjU3NjAiLCJwYXNzd29yZCI6IjEyMzQifQ==',
                    'Content-Type': 'multipart/form-data',
                }
            });
            setKetLuan('')
            setAvatar('')
            setPreviewImgUrl('')
            
            setPatient({name:"",address:"",phone:"",weight:"",height:""})
            // const patientTam = { name: "" }
            // setPatient({ name: "", address: "", phone: "", weight: "", height: "" })
            // setDataThuoc([])

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="UIKhamcontainer">
            <div className="UIKham">
                <div style={{ display: "flex", width: "100%", height: 200, flexDirection: "column" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 15, fontWeight: "bold", color: "red", margin: 15 }}>Thông tin bệnh nhân</span>

                    </div>


                    <div style={{ display: "flex", width: "100%", height: "100%", flexDirection: "column", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "100%" }}>
                            <div style={{ width: "30%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 30 }}><label style={{ width: 85, fontSize: 13, fontWeight: "bold" }}>Họ tên: </label><Input className="input1" type="text" value={patient.name}  ></Input></div>

                            <div style={{ width: "15%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 30 }}><label style={{ width: 45, fontSize: 13, fontWeight: "bold" }}>Tuổi: </label><Input className="input1" type="number" style={{ width: 50, marginLeft: 0, paddingRight: 0 }} ></Input></div>
                            <div style={{ width: "15%", display: "flex", justifyContent: "flex-start", alignItems: "center", }} ><label style={{ width: 70, fontSize: 13, fontWeight: "bold" }}>Giới tính: </label>
                                <select className="selected" name="gioitinh" id="gioitinh" >
                                    <option value="volvo">Nam</option>
                                    <option value="volvo">Nữ</option>
                                </select>
                            </div>
                            <div style={{ width: "25%", display: "flex", justifyContent: "center", alignItems: "center" }}><input type="checkbox"></input><label style={{ fontSize: 14, fontWeight: "inherit" }}>Bệnh nhân cũ </label></div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "100%" }}>

                            <div style={{ width: "30%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 30 }}><label style={{ width: 85, fontSize: 13, fontWeight: "bold" }}>Địa chỉ: </label><Input className="input1" type="text" value={patient.address} ></Input></div>
                            {/* <div style={{ width: "25%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 10 }}><label className="font-label">Tỉnh/TP: </label><Input className="input1" type="text"></Input></div> */}
                            <div style={{ width: "30%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 30 }}><label style={{ width: 150, fontSize: 13, fontWeight: "bold" }}>Số điện thoại: </label><Input className="input1" type="text" value={patient.phone}></Input></div>
                            <div style={{ width: "20%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 30 }}><label style={{ width: 85, fontSize: 13, fontWeight: "bold" }}>Chiều cao : </label>
                                <Input type="text" className="input2" value={patient.height} ></Input>
                            </div>
                            <div style={{ width: "20%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 30 }}><label style={{ width: 65, fontSize: 13, fontWeight: "bold" }}>Cân nặng:</label>
                                <Input type="text" className="input2" value={patient.weight}></Input>
                            </div>
                        </div>

                    </div>



                </div>

                <div className="infoSieuam">


                    <div style={{ flex: 0.5, display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "column" }}>
                        <div style={{ display: "flex", alignItems: "flex-start", width: "100%" }}>
                            <span style={{ fontSize: 15, fontWeight: "bold", color: "red", margin: 15 }}>Hình ảnh siêu âm</span>

                        </div>
                        <div style={{ width: "95%", height: "80%", padding: 10 }}>
                            <Image
                                style={{ borderRadius: 5 }}
                                preview={true}
                                width={150}
                                height={140}
                                src={previewImgUrl}
                            >

                            </Image>
                            {/* <Image
                                style={{ borderRadius: 5 }}
                                preview={true}
                                width={150}
                                height={140}
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx-s6ZT1hX7Yb49cXv_7dquCM37ZQui5cJvw&usqp=CAU"
                            >

                            </Image> */}
                        </div>

                    </div>
                    <div style={{ flex: 0.5, display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "column" }}>
                        <div style={{ display: "flex", alignItems: "flex-start", width: "100%" }}>
                            <span style={{ fontSize: 15, fontWeight: "bold", color: "red", margin: 15 }}>Kết luận</span>
                        </div>
                        <div style={{ width: "95%", height: "80%", }}>

                            <TextArea rows={4} placeholder="Kết luận" style={{ height: 250 }} onChange={(e)=>setKetLuan(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <div style={{ width: "95%", height: "20%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Button type="primary" danger>
                            <label style={{ cursor: "pointer" }}>
                                Thêm hình ảnh
                                <input id="inputTag" type="file" hidden onChange={(event) => handleOnChangeImage(event)} />
                            </label>
                        </Button>


                    </div>
                    <div style={{ width: "95%", height: "20%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Button type="primary" danger onClick={handleSubmit} >Kết thúc siêu âm</Button>
                    </div>
                </div>
            </div>

        </div>
    )
}