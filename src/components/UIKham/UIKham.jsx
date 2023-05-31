import { Button, Table, Space, Switch, notification, Modal, Input, Image } from "antd"
import "../../components/UIKham/UIKham.scss"
import axios from "axios";
import { useState,useRef } from "react";
import { io } from "socket.io-client";
export default function UIKham({ patient, setPatient }) {
    const [api, contextHolder] = notification.useNotification();
    const key = 'updatable';
    const [error,seterror] = useState(false)
    const [checkStrictly, setCheckStrictly] = useState(false);
    const [songay, setsongay] = useState(1)
    const [name, setName] = useState(patient.name)
    const [dateofbirth, setdateofbirth] = useState("")
    const [isOldPatient, setisOldPatient] = useState()
    const [gender, setgender] = useState()
    const [address, setaddress] = useState(patient.address)
    const [phoneNumber, setphoneNumber] = useState(patient.phoneNumber)
    const [chieuCao, setchieuCao] = useState(patient.height)
    const [canNang, setcanNang] = useState(patient.weight)
    const [dataLSThuoc, setDataLSThuoc] = useState([])
    const [date,setDate] = useState(1)
    const user = JSON.parse(localStorage.getItem("currentUser"))
    const socket = useRef();
    socket.current = io('http://localhost:5000');
    // const dataSource = [

    //     // {
    //     //   key: '2',
    //     //   stt: '2',
    //     //   age: 42,
    //     //   address: '10 Downing Street',
    //     // },
    // ];
    const [dataThuoc, setDataThuoc] = useState([])
    const [orderDetails, setOrderDetails] = useState([])
    const [dataSource, setdataSource] = useState([])
    const [dataChon, setDataChon] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalDonThuoc, setIsModalDonThuoc] = useState(false);
    const [isModalSieuAm, setIsModalSieuAm] = useState(false);
    const [isModalOpenex, setIsModalOpenex] = useState(false);
    const [avatar, setavatar] = useState('')
    const [ketLuan,setKetLuan] = useState('')
    const [selectValue, setSelectValue] = useState(1);
    const [examninationHistory, setExamninationHistory] = useState([]);
    const showModalex = async (e) => {
        console.log(e);

        try {
            const respose = await axios.get(
                "http://localhost:9000/api/supports/getExById?id=" + e.id
            );

            if (respose) {
                const dataTam = []
                respose.data.forEach(element => {

                    const tam = element
                    tam.name = element.patient.name
                    tam.address = element.patient.address
                    tam.phone = element.patient.phone
                    tam.doctor = element.doctor.name

                    tam.createdAt = element.createdAt.slice(0, 10)
                    tam.btn = <div>
                        <Button type="primary" size="small" onClick={() => { showModalDonThuoc(element) }} >
                            Xem Chi tiết
                        </Button>
                    </div>
                    dataTam.push(tam)
                });

                setExamninationHistory(dataTam)
                // setPatient(e)

            }
            setIsModalOpenex(true);


        } catch (error) {
            console.log(error);
        }



    };
    const handleOkex = async () => {

        setIsModalOpenex(false);
    };
    const handleCancelex = () => {
        setIsModalOpenex(false);
    };


    const showModalDonThuoc = async (e) => {
        try {
            const respose = await axios.get(
                "http://localhost:9000/api/doctors/getOrderByExId?id=" + e.id
            );
            console.log(respose.data.orderMediceneDetails.length);

            if (respose.data.orderMediceneDetails.length > 0) {
                const dataTam = []
                respose.data.orderMediceneDetails
                    .forEach(element => {

                        const tam = element
                        tam.name = element.medicine.name
                        tam.useUnit = element.medicine.useUnit
                        tam.storageUnit = element.medicine.storageUnit
                        tam.methodOfUse = element.medicine.methodOfUse
                        tam.costPrice = element.price
                        tam.sl = element.quantity
                        tam.tc = element.price * element.quantity
                        // tam.phone = element.patient.phone
                        // tam.doctor = element.doctor.name

                        // tam.createdAt = element.createdAt.slice(0, 10)
                        // tam.btn = <div>
                        //     <Button type="primary" size="small" onClick={() => { showModalDonThuoc(element) }} >
                        //         Đơn thuốc
                        //     </Button>
                        // </div>
                        dataTam.push(tam)
                    });

                setDataLSThuoc(dataTam)
                setIsModalDonThuoc(true)
                // setPatient(e)

            }
            else {
                console.log(respose.data.orderServiceDetails);

                setavatar(new Buffer(respose.data.orderServiceDetails[0].avatar, 'base64').toString('binary'))
                setKetLuan(respose.data.orderServiceDetails[0].ketluan)
                setIsModalSieuAm(true)
            }



        } catch (error) {
            console.log(error);
        }


    };
    const handleOkDonThuoc = async () => {

        setIsModalDonThuoc(false)
    };
    const handleCancelDonThuoc = () => {
        setIsModalDonThuoc(false)
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        console.log(patient);
        try {
            const { data } = await axios.post("http://localhost:9000/api/supports/sendPaitentSA", {
                    name:patient.name,
                    gender: 1,
                    weight: patient.weight,
                    height: patient.height,
                    address,
                    phone: patient.phone,
                    email:"",
                    password:"123",
                    address:patient.address,
                    avatar:null,
                    description:"KH",
                    isActive:1,
                    isLogin:1,
                    verifyCode:1,
                    accessToken:"sad",
                    job:null,
                    examninationHistories:[],
                    registration:null,
                    refeshToken:"sda",
                    position:"sad",
                    roleId:5,
                    updatedAt:null,
                    bloodType:null

            });
            socket.current.emit("send", "ok")
        } catch (error) {

            console.log("fail");
        }
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const columns = [
        {
            title: 'Tên thuốc',
            dataIndex: 'name',
            key: 'stt',
        },

        {
            title: 'ĐVSD/Lần',
            dataIndex: 'useUnit',
            key: 'tuoi',
        },

        {
            title: 'Đ.Vị',
            dataIndex: 'storageUnit',
            key: 'kk',
        },
        {
            title: 'P.Thức',
            dataIndex: 'methodOfUse',
            key: 'kk',
        },
        {
            title: 'Đơn Giá',
            dataIndex: 'costPrice',
            key: 'kk',
        },
        {
            title: 'Số Lượng',
            dataIndex: 'sl'
        },
        {
            title: 'Tổng cộng',
            dataIndex: 'tc',
            key: 'kk',
        },


    ];
    const columnsEx = [

        {
            title: "Họ Tên",
            dataIndex: "name",
            key: "name"
        },

        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Ngày khám',
            dataIndex: 'createdAt',
            key: 'tacvu',
        },
        {
            title: 'Bác sĩ khám',
            dataIndex: 'doctor',
            key: 'tacvu',
        },
        {
            title: 'Chi tiết',
            dataIndex: 'btn',
            key: 'tacvu',
        },
    ];
    const columnssearch = [
        {
            title: 'Tên thuốc',
            dataIndex: 'name',
            key: 'stt',
        },
        {
            title: 'ĐVT',
            dataIndex: 'storageUnit',
            key: 'hoten',
        },
        {
            title: 'ĐVSD',
            dataIndex: 'useUnit',
            key: 'gt',
        },
        {
            title: 'P.Thức',
            dataIndex: 'methodOfUse',
            key: 'methodOfUse',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'costPrice',
            key: 'kk',
        },
        {
            title: 'Ghi chú',
            dataIndex: 'kk',
            key: 'kk',
        },


    ];
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            setDataChon(selectedRows)
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            setDataChon(selectedRows)
            console.log(selected, selectedRows, changeRows);
        },
    };
    const getThuoc = async (e) => {

        try {
            const { data } = await axios.get("http://localhost:9000/api/doctors/getMedia?name=" + e.target.value, {

            });
            const dataTam = []
            data.forEach(element => {
                element.key = element.id
                
                if(element.storageUnit==="Viên")
                {
                    element.tc = songay * element.costPrice * 2 * element.useUnit
                    element.sl = songay * 2 * element.useUnit
                }
                else{
                    element.tc = element.costPrice
                    element.sl = 1
                }
                dataTam.push(element)
            });
            setdataSource(dataTam)
            console.log(data);
        } catch (error) {

        }


    };
    const onchageDate = ()=>{
            const data = [...dataThuoc]
            data.forEach(element => {
                element.key = element.id
                element.tc = songay * element.costPrice * 2 * element.useUnit
                element.sl = songay * 2 * element.useUnit
                data.push(element)
            });
    }

    const Them = () => {
        const dataTam = [...dataThuoc]
        const orderDetailTams = [...orderDetails]
        const or = {}
        dataChon.forEach(element => {
            const or = { name: element.name, price: element.costPrice,useUnit:element.useUnit, price: element.costPrice, quantity: element.sl, medicine: element }
            dataTam.push(element)
            orderDetailTams.push(or)
        });


        setDataThuoc(dataTam)
        setOrderDetails(orderDetailTams)
        setDataChon([])

    }
    const Ktraquantiy = async (id, quantity)=>{
        try {
             const { data } = await axios.get("http://localhost:9000/api/orders/check-quantity?medicine_id="+id+"&quantity="+quantity, {})
             if(data.status===200)
             {
                seterror(true)
             }
             seterror(false)
          
        } catch (error) {
            
        }
    }
    const KetThucKham = async () => {
        try {
            
            
           
            const { data } = await axios.post("http://localhost:9000/api/doctors/saveEx", {
                code: "1",
                amount: 1.0,
                discountPercent: 0,
                discountAmount: 0,
                totalAmount: 0,
                type: 0,
                status: 0,
                receiptNumberNo: 1,
                iscountType: 0,
                description: "Test",
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
                medicines: dataThuoc,
                orderMediceneDetails: orderDetails,
                createdAt: null,
                updatedAt: null
            });
            const patientTam = { name: "" }
            setPatient({ name: "", address: "", phone: "", weight: "", height: "" })
            setDataThuoc([])

        } catch (error) {
            console.log(error);
        }

    }
    const openNotification = () => {
        console.log("alo");

        setTimeout(() => {
            api.open({
                key,
                message: 'Hoàn thành khám',
                // description: 'New description.',
            });
        }, 500);
    };
    const onChange = (event) => {
        const value = parseInt(event.target.value);
        setSelectValue(value);
    };
    const onChangeDate = (e)=>{
        
        const DataTam = [...dataThuoc]
        const datTam = []
        DataTam.forEach(element => {
            if(element.storageUnit==="Viên")
            {
                element.sl = element.useUnit*2*e
                element.tc = e * element.costPrice * 2 * element.useUnit
                datTam.push(element)
                
            }
            else{
                datTam.push(element)
            }
            
            setDataThuoc(datTam)
            
        });
        console.log(datTam);
        
    }
    return (
        <div className="UIKhamcontainer">
            {contextHolder}
            <div className="UIKham">
                <div style={{ display: "flex", width: "100%", height: 230, flexDirection: "column" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 15, fontWeight: "bold", color: "red", margin: 15 }}>Thông tin bệnh nhân</span>
                        <div style={{ display: "flex", justifyContent: "space-between", flex: 0.40, paddingRight: 15, alignItems: "center" }}>
                            <Button type="primary" size="small" danger onClick={() => { showModalex(patient) }}>
                                Lịch sử khám
                            </Button>
                            <Button type="primary" size="small" danger onClick={showModal}>
                                Chỉ đinh CLS
                            </Button>
                            <Modal title="Chỉ đinh cận lâm sàn" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
                                <div style={{ width: "100%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 30 }}><label className="font-label">Chọn dịch vụ : </label>
                                    <select className="input1" name="gioitinh" id="gioitinh" onChange={onChange}>

                                        <option value="1"  >Siêu âm</option>
                                        <option value="2" >Xét nghiệm máu</option>

                                    </select>
                                </div>
                            </Modal>
                            <Modal title="Đơn thuốc" open={isModalDonThuoc} onOk={handleOkDonThuoc} onCancel={handleCancelDonThuoc} width={600} >
                                <div style={{ width: 800, display: "flex", justifyContent: "flex-start", alignItems: "flex-start", paddingLeft: 30, flexDirection: "column" }}>
                                    <label className="font-label">Họ tên:  </label><label>{patient.name}</label>
                                    <br></br>
                                    <label className="font-label">Địa chỉ:  </label><label>{patient.address}</label>
                                    <br></br>
                                    <label className="font-label">Số điện thoại:  </label><label>{patient.phone}</label>
                                    <br></br>
                                    <div>
                                        <label className="font-label">Đơn thuốc</label>
                                        <Table dataSource={dataLSThuoc} columns={columns} size="small">

                                        </Table>
                                    </div>
                                </div>
                            </Modal>
                            <Modal title="Thông tin bệnh nhân" open={isModalOpenex} onOk={handleOkex} onCancel={handleCancelex} width={600}>
                                <div style={{ width: 800, display: "flex", justifyContent: "flex-start", alignItems: "flex-start", paddingLeft: 30, flexDirection: "column" }}>
                                    <label className="font-label">Họ tên:  </label><label>{patient.name}</label>
                                    <br></br>
                                    <label className="font-label">Địa chỉ:  </label><label>{patient.address}</label>
                                    <br></br>
                                    <label className="font-label">Số điện thoại:  </label><label>{patient.phone}</label>
                                    <br></br>
                                    <div>
                                        <label className="font-label">Lịch sử khám bệnh</label>
                                        <Table dataSource={examninationHistory} columns={columnsEx} size="small">

                                        </Table>
                                    </div>
                                </div>
                            </Modal>
                            <Modal title="Siêu Âm" open={isModalSieuAm} onOk={() => setIsModalSieuAm(false)} onCancel={() => setIsModalSieuAm(false)} width={600}>
                                <div style={{ width: 800, display: "flex", justifyContent: "flex-start", alignItems: "flex-start", paddingLeft: 30, flexDirection: "column" }}>
                                    <label className="font-label">Họ tên:  </label><label>{patient.name}</label>
                                    <br></br>
                                    <label className="font-label">Địa chỉ:  </label><label>{patient.address}</label>
                                    <br></br>
                                    <label className="font-label">Số điện thoại:  </label><label>{patient.phone}</label>
                                    <br></br>
                                    <div>
                                        <label className="font-label">Hình ảnh siêu âm</label>
                                        <br></br>
                                        <Image
                                            style={{ borderRadius: 5 }}
                                            preview={true}
                                            width={150}
                                            height={140}
                                            src={avatar}
                                        >
                                        </Image>
                                        <br></br>
                                        <br></br>
                                        <div style={{display:"flex",flexDirection:"row"}}>
                                            <label className="font-label">Kết luận: </label><span style={{paddingLeft:20}}>{ketLuan}</span>
                                        </div>

                                    </div>
                                </div>
                            </Modal>
                            <Button type="primary" size="small" >
                                Chuyển khoa
                            </Button>
                        </div>
                    </div>


                    <div style={{ display: "flex", width: "100%", height: "100%", flexDirection: "column", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "100%" }}>
                            <div style={{ width: "30%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 30 }}><label style={{ width: 85, fontSize: 13, fontWeight: "bold" }}>Họ tên: </label><Input className="input1" type="text" value={patient.name}  ></Input></div>

                            <div style={{ width: "15%", display: "flex", justifyContent: "flex-start", alignItems: "center", paddingLeft: 30 }}><label style={{ width: 45, fontSize: 13, fontWeight: "bold" }}>Tuổi: </label><Input className="input1" type="number" value={patient.name} style={{ width: 50, marginLeft: 0, paddingRight: 0 }} ></Input></div>
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
                <hr></hr>
                <div style={{ display: "flex", width: "100%", height: 250, alignItems: "center", flexDirection: "column" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%", flex: 0.2 }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ fontSize: 15, fontWeight: "bold", color: "red", marginLeft: 15 }}>Đơn thuốc</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", flex: 0.22, paddingRight: 15, alignItems: "center" }}>
                            <label className="font-label">Số ngày thuốc</label>
                            <input type="number" className="input3" onChange={(e) => onChangeDate(e.target.value)} ></input>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", flex: 0.22, paddingRight: 15, alignItems: "center" }}>
                            <label className="font-label">Kết luận: </label>
                            <input type="text" className="input3"></input>
                        </div>
                    </div>
                    <div style={{ display: "flex", flex: 0.8, width: "100%" }}>
                        <Table style={{ width: "100%", padding: 10, height: 200 }} size="small" dataSource={dataThuoc} columns={columns}></Table>

                    </div>

                </div>
                <hr></hr>
                <div style={{ display: "flex", width: "100%", height: 230, alignItems: "center", flexDirection: "column", }}>
                    <div style={{ display: "flex", width: "100%", height: 30, flexDirection: "row" }}>
                        <div className="bordersearch" style={{ display: "flex", width: "100%", height: "100%" }}>
                            <input className="inputserch" type="text" placeholder="Nhập từ khóa tìm kiếm thuốc" onKeyDown={(e) => getThuoc(e)} ></input>
                        </div>
                        <div className="btntt">
                            <div className="btn2" style={{ display: "flex", width: "30%", height: "100%", justifyContent: "center", alignItems: "center" }} onClick={Them}>
                                <span style={{ fontSize: 13, fontWeight: "initial", color: "white" }}>Thêm vào toa</span>
                            </div>
                            <div className="btn3" style={{ display: "flex", width: "30%", height: "100%", justifyContent: "center", alignItems: "center" }} onClick={() => { KetThucKham(); openNotification() }}  >
                                <span style={{ fontSize: 13, fontWeight: "initial", color: "white" }}>Kết thúc khám</span>
                            </div>
                        </div>


                    </div>
                    <div style={{ width: "100%", height: "100%", display: "flex" }}>

                        <Table style={{ width: "100%", padding: 10, height: 220 }} size="small" dataSource={dataSource} columns={columnssearch} rowSelection={rowSelection} pagination={{
                            pageSize: 3,
                        }} ></Table>
                    </div>
                </div>
            </div>
        </div>
    )
}