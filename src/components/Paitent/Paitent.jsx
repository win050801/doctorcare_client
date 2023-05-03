
import { getDate } from "date-fns"
import "../../components/Paitent/Paitent.scss"
import { Input, Table, Button } from 'antd'
import { useEffect } from "react"
export default function Paitent() {
    var today = new Date(),
            date = today.getDate()+'/'+ (today.getMonth() + 1)+'/' + today.getFullYear() 
    return (
        <div className="paitentcontainer">
            <div style={{ display: "flex", flex: 0.1, width: "100%", height: "100%", alignItems: "flex-end", paddingLeft: 20 }}>
                <span style={{ color: "red", fontSize: 14, fontWeight: "bold" }}>Phiếu khám</span>
            </div>
            <div style={{ display: "flex", flex: 0.63, width: "100%", height: "100%", padding: 20 }}>
                <div style={{ display: "flex", width: "70%", height: "100%", backgroundColor: "#EEEEEE", flexDirection: "column",borderRadius:5 }}>
                    <div style={{ display: "flex", flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 15, fontWeight: "bold" }}>Phòng khám</span>
                    </div>
                    <div style={{ display: "flex", flex: 0.3, alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 36, fontWeight: "bold" }}>001</span>
                    </div>
                    <div style={{ display: "flex", flex: 0.1, alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 13, fontWeight: "inherit" }}>Số thứ tự</span>
                    </div>
                    <div style={{ display: "flex", flex: 0.25, alignItems: "flex-end", justifyContent: "center", padding: 15 }}>
                        <span style={{ fontSize: 13, fontWeight: "inherit",textAlign:"center" }}>Quý khách vui lòng chờ, số phiếu của quý khách sẽ được gọi khi đến lượt</span>
                    </div>
                    <hr></hr>
                    <div style={{ display: "flex", flex: 0.15, alignItems: "center", justifyContent: "center" }}>
                        
                        <span style={{ fontSize: 13, fontWeight: "bold" }}>Ngày in : </span><span style={{ fontSize: 13, fontWeight: "inherit" }}>{date}</span>

                    </div>
                </div>
            </div>
            <div style={{ display: "flex", flex: 0.1, width: "70%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                <Button style={{ width: 170 }} type="primary" block>
                    Lưu và in phiếu khám
                </Button>
            </div>
        </div>
    )
}