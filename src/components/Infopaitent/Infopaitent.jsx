

import { useState, useEffect } from "react";
import "../../components/Infopaitent/Infopaitent.scss"
import { Input, Table, Button, Modal } from 'antd'
import axios from "axios";
import Navbar from "../../containers/Menu/Navbar";
export default function Infopaitent() {
    const [data, setData] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [patient, setPatient] = useState({ name: "", address: "", phone: "" })
    const [examninationHistory, setExamninationHistory] = useState([]);
    const showModal = async (e) => {
        console.log(e.id);
        try {
            const respose = await axios.get(
                "http://localhost:9000/api/supports/getExById?id=" + e.patient.id
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
                    dataTam.push(tam)
                });

                setExamninationHistory(dataTam)
                setPatient(e)
                setIsModalOpen(true);
            }


        } catch (error) {
            console.log(error);
        }

    };
    const handleOk = async () => {

        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {

        async function fetchData() {
            // You can await here
            //   console.log("test");
            const buongTam = 0


            try {
                const { data } = await axios.get(
                    "http://localhost:9000/api/supports/getRegistration"
                );

                if (data) {
                    const dataTam = []
                    data.forEach(element => {
                        const tam = element
                        tam.name = element.patient.name
                        tam.address = element.patient.address
                        tam.phone = element.patient.phone
                        tam.age = element.patient.age
                        tam.tacvu = <div style={{ display: "flex" }}>
                            <Button style={{ width: 100 }} type="primary" block onClick={() => { showModal(element) }}>
                                Chi tiết
                            </Button>

                        </div>
                        dataTam.push(element)
                    });
                    setData(dataTam)
                    console.log(data);
                }


                // console.log(response);
            } catch (error) {
                console.log(error);
            }


        }
        fetchData();


    }, []);

    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: "Họ Tên",
            dataIndex: "name",
            key: "name"
        },
        {
            title: 'Tuổi',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tác vụ',
            dataIndex: 'tacvu',
            key: 'tacvu',
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
    ];
    return (
        <div className="InfoContainer">
            <Navbar></Navbar>
            <div className="InfoContainer1">
                <div className="headerds">
                    <h3 style={{ fontSize: 24, fontWeight: 'bold', color: "White" }}>Danh sách bệnh nhân</h3>
                </div>
                <div>
                <Modal title="Thông tin bệnh nhân" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <div style={{ width: "100%", display: "flex", justifyContent: "flex-start", alignItems: "flex-start", paddingLeft: 30, flexDirection: "column" }}>
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
                <Table dataSource={data} columns={columns} size="small" />
                </div>
            </div>

        </div>
    )
}