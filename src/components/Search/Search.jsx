import React from "react";
import { useState, useEffect } from "react";
import "../../components/Search/Search.scss"
import { Input, Table, List, Avatar, message } from 'antd'
import axios from "axios";
import VirtualList from 'rc-virtual-list';
const fakeDataUrl =
    'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = 500;
export default function Search({setPatient}) {
    const [data1, setData1] = useState([])

    const [data, setData] = useState([]);
    const search = async (e) => {
        try {
            const { data } = await axios.get("http://localhost:8000/api/supports/getPatientByName?name=" + e.target.value, {

            });

            setData1(data)
        } catch (error) {

        }
    };

    // const onScroll = (e) => {
    //     if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
    //         appendData();
    //     }
    // };


    const appendData = () => {
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((body) => {
                setData(data.concat(body.results));

            });
    };
    useEffect(() => {
        appendData();
    }, []);
    const onScroll = (e) => {
        if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
            appendData();
        }
    };
    const click = (e)=>{
       setPatient(e)
    }


    return (
        <div className="search">
            <div className="container">
                <span style={{ color: "#00BB00", fontSize: 15, fontWeight: "bold" }}>Tìm kiếm</span><br></br>
                <Input placeholder="Tìm kiếm bệnh nhân cũ" style={{ marginTop: 10 }} onChange={(e) => search(e)} ></Input>
                {/* <div style={{ display: "flex", width: "100%", height: "50%", marginTop: 20 }}>
                    <List
                   
                            itemLayout="horizontal"
                            dataSource={data}
                            onScroll={onScroll}
                            itemHeight={10}
                            
                            renderItem={(item) => (
                                <p>{item.name}</p>
                            )}
                        >
                      
                    </List>
                </div> */}
                <List>
                    <VirtualList
                        data={data1}
                        height={ContainerHeight}
                        itemHeight={47}
                        itemKey="email"
                        onScroll={onScroll}
                    >
                        {(item) => (
                            <List.Item key={item.id}>
                                <div style={{padding:5,cursor:"pointer" }} onClick={()=>click(item)} >
                                    <span style={{fontSize:14,fontWeight:"bold"}}>
                                        {item.name}
                                    </span>
                                    <br></br>
                                    <span style={{fontSize:12,fontWeight:"bold"}}>SĐT:  </span>
                                    <span style={{fontSize:12,fontWeight:"inherit"}}>
                                        {item.phone}
                                    </span>
                                </div>
                            </List.Item>
                        )}
                    </VirtualList>
                </List>
            </div>

        </div>
    )
}