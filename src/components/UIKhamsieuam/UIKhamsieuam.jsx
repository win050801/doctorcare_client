import { Button, Table, Image, Input, Modal } from "antd"
import "../../components/UIKhamsieuam/UIKhamsieuam.scss"

export default function UIKhamSieuam({patient}) {
    const { TextArea } = Input;
    
    const dataSource = [

        // {
        //   key: '2',
        //   stt: '2',
        //   age: 42,
        //   address: '10 Downing Street',
        // },
    ];
    const columns = [
        {
            title: 'Tên thuốc',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: 'Số Lần/Ngày',
            dataIndex: 'hoten',
            key: 'hoten',
        },
        {
            title: 'SL/Lần',
            dataIndex: 'gt',
            key: 'gt',
        },
        {
            title: 'ĐVSD/Lần',
            dataIndex: 'tuoi',
            key: 'tuoi',
        },
        {
            title: 'Tổng cộng',
            dataIndex: 'kk',
            key: 'kk',
        },
        {
            title: 'Đ.Vị',
            dataIndex: 'kk',
            key: 'kk',
        },
        {
            title: 'P.Thức',
            dataIndex: 'kk',
            key: 'kk',
        },
        {
            title: 'Chỉ định cách dùng',
            dataIndex: 'kk',
            key: 'kk',
        },

    ];
    const columnssearch = [
        {
            title: 'Tên thuốc',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: 'ĐVT',
            dataIndex: 'hoten',
            key: 'hoten',
        },
        {
            title: 'ĐVSD',
            dataIndex: 'gt',
            key: 'gt',
        },
        {
            title: 'P.Thức',
            dataIndex: 'tuoi',
            key: 'tuoi',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'kk',
            key: 'kk',
        },
        {
            title: 'Ghi chú',
            dataIndex: 'kk',
            key: 'kk',
        },


    ];

    return (
        <div className="UIKhamcontainer">
            <div className="UIKham">
                <div style={{ display: "flex", width: "100%", height: 200, flexDirection: "column" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 15, fontWeight: "bold", color: "red", margin: 15 }}>Thông tin bệnh nhân</span>

                    </div>


                    <div style={{ display: "flex", width: "100%", height: "100%", flexDirection: "column", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "100%" }}>
                            <div style={{ width: "25%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 30 }}><label className="font-label">Họ tên: </label><input className="input1" type="text" value={patient.name}  ></input></div>
                            <div style={{ width: "25%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 10 }}><label className="font-label">Ngày sinh: </label><input className="input1" type="text"></input></div>
                            <div style={{ width: "25%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 10 }}><label className="font-label">Tuổi: </label><input className="input1" type="text"></input></div>
                            <div style={{ width: "25%", display: "flex", justifyContent: "center", alignItems: "center" }}><label style={{ fontSize: 14, fontWeight: "bold" }}>Bệnh nhân cũ </label></div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "100%" }}>
                            <div style={{ width: "15%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 30 }}><label className="font-label">Giới tính: </label>
                                <select className="input1" name="gioitinh" id="gioitinh">

                                    <option value="volvo">Nam</option>
                                    <option value="volvo">Nữ</option>

                                </select>
                            </div>
                            <div style={{ width: "25%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 10 }}><label className="font-label">Địa chỉ: </label><input className="input1" type="text"></input></div>
                            <div style={{ width: "25%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 10 }}><label className="font-label">Tỉnh/TP: </label><input className="input1" type="text"></input></div>
                            <div style={{ width: "30%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 10 }}><label className="font-label">Số điện thoại: </label><input className="input1" type="text" value={patient.phone}></input></div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "100%" }}>
                            <div style={{ width: "30%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 30 }}><label className="font-label">Người giám hộ: </label><input className="input1" type="text"></input></div>
                            <div style={{ width: "14%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 10 }}><label className="font-label">Mạnh: </label><input className="input2" type="text"></input></div>
                            <div style={{ width: "14%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 10 }}><label className="font-label">H.áp: </label><input className="input2" type="text"></input></div>
                            <div style={{ width: "14%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 10 }}><label className="font-label">C.nặng: </label><input className="input2" type="text" value={patient.weight}></input></div>
                            <div style={{ width: "14%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 10 }}><label className="font-label">C.cao: </label><input className="input2" type="text" value={patient.height}></input></div>
                            <div style={{ width: "14%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 10 }}><label className="font-label">BMI: </label><input className="input2" type="text"></input></div>
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
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx-s6ZT1hX7Yb49cXv_7dquCM37ZQui5cJvw&usqp=CAU"
                            >

                            </Image>
                            <Image
                                style={{ borderRadius: 5 }}
                                preview={true}
                                width={150}
                                height={140}
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx-s6ZT1hX7Yb49cXv_7dquCM37ZQui5cJvw&usqp=CAU"
                            >

                            </Image>
                        </div>
                        <div style={{ width: "95%", height: "20%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Button type="primary" danger >Thêm hình ảnh siêu âm</Button>
                        </div>
                    </div>
                    <div style={{ flex: 0.5, display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "column" }}>
                        <div style={{ display: "flex", alignItems: "flex-start", width: "100%" }}>
                            <span style={{ fontSize: 15, fontWeight: "bold", color: "red", margin: 15 }}>Kết luận</span>
                        </div>
                        <div style={{ width: "95%", height: "80%", }}>

                            <TextArea rows={4} placeholder="Kết luận" style={{ height: 320 }} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}