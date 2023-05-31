import "../../components/MenuDoctor/MenuDoctor.scss"
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useEffect, useState,useRef } from "react"
import { Input, Table, Button } from 'antd'
import axios from "axios";
import socketIO from 'socket.io-client';
import { io } from "socket.io-client";
export default function MenuDoctor({ setPatient }) {
    const [dsbn, setDsbn] = useState([])
    const [buong, setBuong] = useState(0);
    const [dsbnut, setDsbnut] = useState([])
    const [change, setchange] = useState(0)
    const socket = useRef();
    socket.current = io('http://localhost:5000');
    global.change = 0
    useEffect(() => {

        async function fetchData() {
            // You can await here
            //   console.log("test");

            if (localStorage.getItem("buong")) {
                if (JSON.parse(localStorage.getItem("buong")) === 1) {
                    try {
                        const response = await axios.get(
                            "http://localhost:9000/api/doctors/getBuong1"
                        );
                        // setDsbn(response.data);
                        // if (localStorage.getItem("user")) {
                        //     setCustomer(JSON.parse(localStorage.getItem("user")));
                        // }
                        if (response.data) {
                            setDsbn(response.data)
                        }
                        const response1 = await axios.get(
                            "http://localhost:9000/api/doctors/getBuong1UT"
                        );
                        // setDsbn(response.data);
                        // if (localStorage.getItem("user")) {
                        //     setCustomer(JSON.parse(localStorage.getItem("user")));
                        // }
                        if (response.data) {
                            setDsbnut(response1.data)
                        }


                        // console.log(response);
                    } catch (error) {
                        console.log(error);
                    }
                }
                else if (JSON.parse(localStorage.getItem("buong")) === 2) {
                    try {
                        const response = await axios.get(
                            "http://localhost:9000/api/doctors/getBuong2"
                        );
                        // setDsbn(response.data);
                        // if (localStorage.getItem("user")) {
                        //     setCustomer(JSON.parse(localStorage.getItem("user")));
                        // }
                        if (response.data) {
                            setDsbn(response.data)
                        }
                        const response1 = await axios.get(
                            "http://localhost:9000/api/doctors/getBuong2UT"
                        );
                        // setDsbn(response.data);
                        // if (localStorage.getItem("user")) {
                        //     setCustomer(JSON.parse(localStorage.getItem("user")));
                        // }
                        if (response.data) {
                            setDsbnut(response1.data)
                        }


                        // console.log(response);
                    } catch (error) {
                        console.log(error);
                    }
                }
            }




            // ...
        }
        fetchData();

    }, [global.change]);
    useEffect(() => {
        async function fetchData() {
            console.log(socket);

            if (socket) {

                socket.current.on("send-ok",async (test) => {
                    if (localStorage.getItem("buong")) {
                        if (JSON.parse(localStorage.getItem("buong")) === 1) {
                            try {
                                const response = await axios.get(
                                    "http://localhost:9000/api/doctors/getBuong1"
                                );
                                // setDsbn(response.data);
                                // if (localStorage.getItem("user")) {
                                //     setCustomer(JSON.parse(localStorage.getItem("user")));
                                // }
                                if (response.data) {
                                    setDsbn(response.data)
                                }
                                const response1 = await axios.get(
                                    "http://localhost:9000/api/doctors/getBuong1UT"
                                );
                                // setDsbn(response.data);
                                // if (localStorage.getItem("user")) {
                                //     setCustomer(JSON.parse(localStorage.getItem("user")));
                                // }
                                if (response.data) {
                                    setDsbnut(response1.data)
                                }


                                // console.log(response);
                            } catch (error) {
                                console.log(error);
                            }
                        }
                        else if (JSON.parse(localStorage.getItem("buong")) === 2) {
                            try {
                                const response = await axios.get(
                                    "http://localhost:9000/api/doctors/getBuong2"
                                );
                                // setDsbn(response.data);
                                // if (localStorage.getItem("user")) {
                                //     setCustomer(JSON.parse(localStorage.getItem("user")));
                                // }
                                if (response.data) {
                                    setDsbn(response.data)
                                }
                                const response1 = await axios.get(
                                    "http://localhost:9000/api/doctors/getBuong2UT"
                                );
                                // setDsbn(response.data);
                                // if (localStorage.getItem("user")) {
                                //     setCustomer(JSON.parse(localStorage.getItem("user")));
                                // }
                                if (response.data) {
                                    setDsbnut(response1.data)
                                }


                                // console.log(response);
                            } catch (error) {
                                console.log(error);
                            }
                        }
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
        if (localStorage.getItem("buong")) {
            if (JSON.parse(localStorage.getItem("buong")) === 1) {
                try {
                    const { data } = await axios.get("http://localhost:9000/api/doctors/getBNBuong1?index=" + index, {

                    });
                    const dsTam = [...dsbn]
                    dsTam.splice(index, 1)
                    setDsbn(dsTam)
                } catch (error) {

                }
            }
            else if (JSON.parse(localStorage.getItem("buong")) === 2) {
                try {
                    const { data } = await axios.get("http://localhost:9000/api/doctors/getBNBuong2?index=" + index, {

                    });
                    const dsTam = [...dsbn]
                    dsTam.splice(index, 1)
                    setDsbn(dsTam)
                } catch (error) {

                }
            }
        }


    };
    const getBNUT = async (index) => {
        if (localStorage.getItem("buong")) {
            if (JSON.parse(localStorage.getItem("buong")) === 1) {
                try {
                    const { data } = await axios.get("http://localhost:9000/api/doctors/getBNBuong1UT?index=" + index, {

                    });
                    const dsTam = [...dsbnut]
                    dsTam.splice(index, 1)
                    setDsbnut(dsTam)
                } catch (error) {

                }
            }
            else if (JSON.parse(localStorage.getItem("buong")) === 2) {
                try {
                    const { data } = await axios.get("http://localhost:9000/api/doctors/getBNBuong2UT?index=" + index, {

                    });
                    const dsTam = [...dsbnut]
                    dsTam.splice(index, 1)
                    setDsbnut(dsTam)
                } catch (error) {

                }
            }
        }

    };
    const openBuong = async () => {
        try {
            const { data } = await axios.post("http://localhost:9000/api/doctors/openBuong", {

            });
            setBuong(data)
            localStorage.setItem(
                "buong",
                JSON.stringify(data)
            );
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
                    <span style={{ color: "red", fontSize: 15, fontWeight: "bold", margin: 15 }}>Danh sách bệnh nhân ưu tiên</span>
                    <div style={{ width: "90%", height: "100%" }}>
                        {dsbn === [] ? (<></>) : (
                            <div style={{ width: "90%", height: "100%" }}>
                                {dsbnut.map((item, index) => {
                                    return (
                                        <div>
                                            <div style={{ display: "flex", flexDirection: "row", paddingLeft: 15, height: 13, justifyContent: "space-between" }}>
                                                <span style={{ fontSize: 13, fontWeight: "inherit" }}>{index + 1}. {item.name}</span>
                                                <div style={{ display: "flex", width: 30, justifyContent: "space-between", paddingTop: 3, cursor: "pointer" }}>
                                                    <CheckOutlined onClick={() => { setPatients(item, index); getBNUT(index) }} />
                                                   
                                                </div>
                                            </div>
                                            <hr style={{ marginLeft: 15 }}></hr>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>

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