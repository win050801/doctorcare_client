import "../../components/MenuDoctor/MenuDoctor.scss"
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useEffect, useState,useRef } from "react"
import { Input, Table, Button } from 'antd'
import axios from "axios";
import CommonUtils from "../../../src/utils/CommonUtils";
import { io } from "socket.io-client";
export default function MenuDoctorSieuAm({ setPatient }) {
    const [dsbn, setDsbn] = useState([])
    const socket = useRef();
    socket.current = io('http://localhost:5000');
    const [dsbnut, setDsbnut] = useState([{ stt: 4, name: "Tan Trong" }, { stt: 5, name: "Minh Quang" }])
    useEffect(() => {
        const timer = setTimeout(() => {
            async function fetchData() {
                // You can await here
                //   console.log("test");
                try {
                    const response = await axios.get(
                        "http://localhost:9000/api/doctors/getBuong1SA"
                    );
                    // setDsbn(response.data);
                    // if (localStorage.getItem("user")) {
                    //     setCustomer(JSON.parse(localStorage.getItem("user")));
                    // }

                    if (response.data !== "") {
                        setDsbn(response.data)
                    }



                    // console.log(response);
                } catch (error) {
                    console.log(error);
                }

                // ...
            }
            fetchData();
        }, 300);
        return () => clearTimeout(timer);
    }, []);
    useEffect(() => {
        async function fetchData() {
            console.log(socket);

            if (socket) {

                socket.current.on("send-ok",async (test) => {
                    try {
                        const response = await axios.get(
                            "http://localhost:9000/api/doctors/getBuong1SA"
                        );
                        // setDsbn(response.data);
                        // if (localStorage.getItem("user")) {
                        //     setCustomer(JSON.parse(localStorage.getItem("user")));
                        // }
    
                        if (response.data !== "") {
                            setDsbn(response.data)
                        }
    
    
    
                        // console.log(response);
                    } catch (error) {
                        console.log(error);
                    }
                    
                });

            }




        }
        fetchData();
    }, []);
    
    const setPatients = (item, index) => {

        setPatient(item)
    };
    const getBN = async (index) => {
        try {
            const { data } = await axios.get("http://localhost:9000/api/doctors/getBNBuong1SA?index=" + index, {

            });
            const dsTam = [...dsbn]
            dsTam.splice(index, 1)
            setDsbn(dsTam)
        } catch (error) {

        }
    };
    const openBuong = async () => {
        try {
            const { data } = await axios.post("http://localhost:9000/api/doctors/openbuong1SA", {

            });

            console.log(data);
        } catch (error) {

        }

    };


    return (
        <div className="MenuDoctorContainer">
            <div className="MenuDoctor" style={{ display: "flex", width: "90%", height: "97%", backgroundColor: "white" }}>
                <div style={{ flex: 0.4, width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
                    <span style={{ color: "#00BB00", fontSize: 15, fontWeight: "bold", margin: 15 }}>Danh sách bệnh nhân</span>
                    {dsbn === [] ? (<></>) : (
                        <div style={{ width: "90%", height: "100%" }}>
                            {dsbn.map((item, index) => {
                                return (
                                    <div>
                                        <div style={{ display: "flex", flexDirection: "row", paddingLeft: 15, height: 13, justifyContent: "space-between" }}>
                                            <span style={{ fontSize: 13, fontWeight: "inherit" }}>{index + 1}. {item.name}</span>
                                            <div style={{ display: "flex", width: 50, justifyContent: "space-between", paddingTop: 3, cursor: "pointer" }}>
                                                <CheckOutlined onClick={() => { setPatients(item, index); getBN(index) }} />
                                               
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
                    

                </div>
                <div style={{ flex: 0.2, width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Button style={{ width: "80%" }} type="primary" danger>
                        Bệnh nhân tiếp theo
                    </Button>
                    <br></br>
                    <Button style={{ width: "80%" }} type="primary" danger onClick={openBuong}>
                        Bắt đầu ca làm
                    </Button>
                </div>
            </div>
        </div>
    )
}