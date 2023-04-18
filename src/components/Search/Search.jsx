import React from "react";
import "../../components/Search/Search.scss"
import {Input} from 'antd'
export default function Search() {


    return (
        <div className="search">
            <div className="container">
                <span style={{color:"#00BB00",fontSize:15,fontWeight:"bold"}}>Tìm kiếm</span><br></br>
                <Input placeholder="Tìm kiếm bệnh nhân cũ" style={{marginTop:10}}></Input>
            </div>
        </div>
    )
}