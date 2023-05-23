
import "../../components/Listwait/Listwait.scss"
import { useState, useEffect } from "react";
import { Input, Table, Button } from 'antd'
import axios from "axios";
export default function Listwait() {
    const [data, setData] = useState([])
    const dataSource = [
        {
            key: '1',
            stt: '1',
            hoten: "Mạnh Đức",
            gt: "Nam",
            tuoi: 32,
            kk: "Tiêu hóa",
        },
        {
            key: '2',
            stt: '2',
            hoten: "Đào Cao Thắng",
            gt: "Nam",
            tuoi: 42,
            kk: "Chấn thương",
        },
        // {
        //   key: '2',
        //   stt: '2',
        //   age: 42,
        //   address: '10 Downing Street',
        // },
    ];
    useEffect(() => {

        async function fetchData() {
            // You can await here
            //   console.log("test");
            const buongTam = 0


            try {
                const { data } = await axios.get(
                    "http://localhost:8000/api/supports/getRegistration"
                );

                if (data) {
                    const dataTam = []
                    data.forEach(element => {
                        const tam = element
                        tam.name = element.patient.name
                        tam.address = element.patient.address
                        tam.phone = element.patient.phone

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

    ];
    return (
        <div className="listwaitcontrainer">
            <div style={{ display: "flex", flex: 0.1, width: "100%", height: "100%", alignItems: "flex-end", paddingLeft: 20 }}>
                <span style={{ color: "red", fontSize: 14, fontWeight: "bold" }}>Danh sách bệnh nhân đang chờ</span>
            </div>
            <div style={{ display: "flex", flex: 0.9, width: "100%", height: "100%", padding: 20 }}>
                <Table style={{ width: "100%", height: "100%" }} dataSource={data} columns={columns} size="small" pagination={{
                    pageSize: 7,
                }} />
            </div>
        </div>
    )
}