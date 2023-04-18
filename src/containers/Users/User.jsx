import React from "react";
import "../../containers/Users/User.scss"
import { Avatar } from "antd";
export default function User() {


    return (
        <div className="users">
            <div><Avatar style={{ width: 50, height: 50}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiMlwol7rv8v5Pow3aHCKBItnQ6MjlvUknvA&usqp=CAU" /></div>
            <div className="user-1">
                <span style={{fontSize:15,color:"white",fontWeight:"bold"}}>Dao Cao Thang</span>
                <span style={{fontSize:14,color:"white"}}>online</span>
            </div>
            
        </div>
        
    )
}