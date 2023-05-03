import { Button, Table } from "antd"
import "../../components/UIKham/UIKham.scss"

export default function UIKham({patient}) {
   
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
                <div style={{ display: "flex", width: "100%", height: 250, flexDirection: "column" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 15, fontWeight: "bold", color: "red", margin: 15 }}>Thông tin bệnh nhân</span>
                        <div style={{ display: "flex", justifyContent: "space-between", flex: 0.23, paddingRight: 15, alignItems: "center" }}>
                            <Button type="primary" size="small" danger>
                                Chỉ đinh CLS
                            </Button>
                            <Button type="primary" size="small" >
                                Chuyển khoa
                            </Button>
                        </div>
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
                            <div style={{ width: "30%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 10 }}><label className="font-label">Số điện thoại: </label><input className="input1" type="text"></input></div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "100%" }}>
                            <div style={{ width: "30%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 30 }}><label className="font-label">Người giám hộ: </label><input className="input1" type="text"></input></div>
                            <div style={{ width: "14%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 10 }}><label className="font-label">Mạnh: </label><input className="input2" type="text"></input></div>
                            <div style={{ width: "14%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 10 }}><label className="font-label">H.áp: </label><input className="input2" type="text"></input></div>
                            <div style={{ width: "14%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 10 }}><label className="font-label">C.nặng: </label><input className="input2" type="text"></input></div>
                            <div style={{ width: "14%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 10 }}><label className="font-label">C.cao: </label><input className="input2" type="text"></input></div>
                            <div style={{ width: "14%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 10 }}><label className="font-label">BMI: </label><input className="input2" type="text"></input></div>
                        </div>
                    </div>



                </div>
                <hr></hr>
                <div style={{ display: "flex", flex: 0.25, width: "100%", height: "100%", alignItems: "center", flexDirection: "column" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%", flex: 0.2 }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ fontSize: 15, fontWeight: "bold", color: "red", marginLeft: 15 }}>Đơn thuốc</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", flex: 0.22, paddingRight: 15, alignItems: "center" }}>
                            <label className="font-label">Số ngày thuốc</label>
                            <input type="text" className="input3"></input>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", flex: 0.15, paddingRight: 15, alignItems: "center" }}>
                            <label className="font-label">Hẹn tái khám</label>
                            <input type="checkbox" style={{ height: 20 }}></input>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", flex: 0.22, paddingRight: 15, alignItems: "center" }}>
                            <label className="font-label">Ngày tái khám</label>
                            <input type="text" className="input3"></input>
                        </div>
                    </div>
                    <div style={{ display: "flex", flex: 0.8 ,width:"100%"}}>
                        <Table style={{width:"100%",padding:10}} size="small" dataSource={dataSource} columns={columns}></Table>

                    </div>

                </div>
                <hr></hr>
                <div style={{ display: "flex", flex: 0.25, width: "100%", height: "100%", alignItems: "center", flexDirection: "column",}}>
                    <div style={{display:"flex",width:"100%",height:30,flexDirection:"row"}}>
                        <div className="bordersearch" style={{display:"flex",width:"100%",height:"100%"}}>
                            <input className="inputserch" type="text" placeholder="Nhập từ khóa tìm kiếm thuốc"></input>
                        </div>
                        <div className="btntt">
                            <div className="btn2" style={{display:"flex",width:"30%",height:"100%",justifyContent:"center",alignItems:"center"}}>
                                <span style={{fontSize:13,fontWeight:"initial",color:"white"}}>Thêm vào toa</span>
                            </div>
                        </div>

                    </div>
                    <div style={{width:"100%",height:"100%",display:"flex"}}>
                        <Table style={{width:"100%",padding:10}} size="small" dataSource={dataSource} columns={columnssearch}></Table>
                    </div>
                </div>
            </div>
        </div>
    )
}