

import "../../components/Infopaitent/Infopaitent.scss"
import { Input, Table, Button } from 'antd'
export default function Infopaitent() {
    const dataSource = [
        {
            key: '1',
            stt: '1',
            name: "Mạnh Đức",
            age: 32,
            khoa: "Tiêu hóa",
            address: '778 Thống Nhất Gò Vấp Tp.HCM',
            tacvu:
                <div style={{display:"flex"}}>
                    <Button style={{width:100}} type="primary" block>
                        Chi tiết
                    </Button>
                    <Button style={{width:70,marginLeft:20}} type="primary" danger>
                        Xóa
                    </Button>
                </div>
        },
        {
            key: '2',
            stt: '2',
            name: "Đào Cao Thắng",
            age: 42,
            khoa: "Chấn thương",
            address: '778 Thống Nhất Gò Vấp Tp.HCM',
            tacvu:
                <div style={{display:"flex"}}>
                    <Button style={{width:100}} type="primary" block>
                        Chi tiết
                    </Button>
                    <Button style={{width:70,marginLeft:20}} type="primary" danger>
                        Xóa
                    </Button>
                </div>
        },
        // {
        //   key: '2',
        //   stt: '2',
        //   age: 42,
        //   address: '10 Downing Street',
        // },
    ];

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
            title: "Khoa khám",
            dataIndex: 'khoa',
            key: 'khoa',
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
    return (
        <div className="InfoContainer">
            <div className="headerds">
                <h3 style={{fontSize:24,fontWeight:'bold',color:"White"}}>Danh sách bệnh nhân</h3>
            </div>
            <Table dataSource={dataSource} columns={columns} />;
        </div>
    )
}