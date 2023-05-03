import "../../components/MenuDoctor/MenuDoctor.scss"
import { CheckOutlined,CloseOutlined} from "@ant-design/icons";
import { useEffect, useState } from "react"
import { Input, Table, Button } from 'antd'
import axios from "axios";
export default function MenuDoctor({setPatient}) {
    const [dsbn, setDsbn] = useState([])

    const [dsbnut, setDsbnut] = useState([{ stt: 4, name: "Tan Trong" }, { stt: 5, name: "Minh Quang" }])
    useEffect(() => {
        const timer = setTimeout(() => {
            async function fetchData() {
                // You can await here
                //   console.log("test");
                try {
                    const response = await axios.get(
                        "http://localhost:8000/getBuong1"
                    );
                    // setDsbn(response.data);
                    // if (localStorage.getItem("user")) {
                    //     setCustomer(JSON.parse(localStorage.getItem("user")));
                    // }
                    console.log(response.data);
                    setDsbn(response.data)
    
                    // console.log(response);
                } catch (error) {
                    console.log(error);
                }
    
                // ...
            }
            fetchData();
        }, 1000);
        return () => clearTimeout(timer);
      }, []);
    // useEffect(() => {
    //     async function fetchData() {
    //         // You can await here
    //         //   console.log("test");
    //         try {
    //             const response = await axios.get(
    //                 "http://localhost:8000/getBuong1"
    //             );
    //             // setDsbn(response.data);
    //             // if (localStorage.getItem("user")) {
    //             //     setCustomer(JSON.parse(localStorage.getItem("user")));
    //             // }
    //             console.log(response.data);
    //             setDsbn(response.data)

    //             // console.log(response);
    //         } catch (error) {
    //             console.log(error);
    //         }

    //         // ...
    //     }
    //     fetchData();
    // }, []);
    const setPatients = (item,index) => {
        
        setPatient(item)
    };
    
    return (
        <div className="MenuDoctorContainer">
            <div className="MenuDoctor" style={{ display: "flex", width: "90%", height: "97%", backgroundColor: "white" }}>
                <div style={{ flex: 0.4, width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
                    <span style={{ color: "#00BB00", fontSize: 15, fontWeight: "bold", margin: 15 }}>Danh sách bệnh nhân</span>
                    {dsbn ===[]?(<></>):(
                        <div style={{ width: "90%", height: "100%" }}>
                        {dsbn.map((item, index) => {
                            return (
                                <div>
                                    <div style={{ display: "flex", flexDirection: "row", paddingLeft: 15, height: 13,justifyContent:"space-between" }}>
                                        <span style={{ fontSize: 13, fontWeight: "inherit" }}>{index+1}. {item.name}</span>
                                        <div style={{display:"flex",width:50,justifyContent:"space-between",paddingTop:3,cursor:"pointer"}}>
                                            <CheckOutlined onClick={ ()=>setPatients(item,index)  }  />
                                            <CloseOutlined />
                                        </div>
                                    </div>
                                    <hr style={{ marginLeft: 15 }}></hr>
                                </div>
                            )
                        })}
                    </div>
                    )}
                    
                </div>
                <div style={{ flex: 0.4, width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
                    <span style={{ color: "red", fontSize: 15, fontWeight: "bold", margin: 15 }}>Danh sách bệnh nhân ưu tiên</span>
                    <div style={{ width: "90%", height: "100%" }}>
                        {dsbnut.map((item, index) => {
                            return (
                                <div>
                                    <div style={{ display: "flex", flexDirection: "row", paddingLeft: 15, height: 13,justifyContent:"space-between" }}>
                                        <span style={{ fontSize: 13, fontWeight: "inherit" }}>{item.stt}. {item.name}</span>
                                        <div style={{display:"flex",width:50,justifyContent:"space-between",paddingTop:3,cursor:"pointer"}}>
                                            <CheckOutlined />
                                            <CloseOutlined />
                                        </div>
                                    </div>
                                    <hr style={{ marginLeft: 15 }}></hr>
                                </div>
                            )
                        })}
                    </div>
                    
                </div>
                <div style={{ flex: 0.2, width: "100%", height: "100%", display: "flex", flexDirection: "column",alignItems:"center" }}>
                    <Button style={{width:"80%"}} type="primary" danger>
                        Bệnh nhân tiếp theo
                    </Button>
                </div>
            </div>
        </div>
    )
}