
import "../../components/Listwait/Listwait.scss"
import { Input, Table, Button } from 'antd'
export default function Listwait()
{
    const dataSource = [
        {
            key: '1',
            stt: '1',
            hoten: "Mạnh Đức",
            gt:"Nam",
            tuoi: 32,
            kk: "Tiêu hóa",
        },
        {
            key: '2',
            stt: '2',
            hoten: "Đào Cao Thắng",
            gt:"Nam",
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
    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: 'Họ Tên',
            dataIndex: 'hoten',
            key: 'hoten',
        },
        {
            title: 'Giới Tính',
            dataIndex: 'gt',
            key: 'gt',
        },
        {
            title: 'Tuổi',
            dataIndex: 'tuoi',
            key: 'tuoi',
        },
        {
            title: 'Khoa Khám',
            dataIndex: 'kk',
            key: 'kk',
        },
       
    ];
    return(
        <div className="listwaitcontrainer">
            <div style={{display:"flex",flex:0.1,width:"100%",height:"100%",alignItems:"flex-end",paddingLeft:20}}>
                <span style={{color:"red",fontSize:14,fontWeight:"bold"}}>Danh sách bệnh nhân đang chờ</span>
            </div>
            <div style={{display:"flex",flex:0.9,width:"100%",height:"100%",padding:20}}>
                <Table style={{width:"100%",height:"100%"}} dataSource={dataSource} columns={columns} size="small" />
            </div>
        </div>
    )
}