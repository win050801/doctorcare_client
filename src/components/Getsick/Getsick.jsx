import React from "react";
import "../../components/Getsick/Getsick.scss"
import { Input } from 'antd'
import Listwait from "../Listwait/Listwait";
import Paitent from "../Paitent/Paitent";
export default function Getsick() {


    return (
        <div className="getsick">
            <div className="containergetsick">
                <div className="info">
                    <span style={{ fontSize: 15, fontWeight: "bold", color: "red", margin: 10 }}>Thông tin bệnh nhân</span>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: 20 }}>
                        <div><span>Họ tên : </span> <input type="text" ></input></div>
                        <div><span>Năm sinh : </span> <input ></input></div>
                        <div><span>Tuổi : </span> <input ></input></div>
                        <div><input type="checkbox"></input><span>Bệnh nhân cũ</span></div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: 20 }}>
                        <div><span>Giới tính : </span> <select id="cars">
                            <option value="volvo">Nam</option>
                            <option value="saab">Nữ</option>

                        </select></div>
                        <div><span>Địa chỉ : </span> <input ></input></div>
                        <div><span>Điện thoại : </span> <input ></input></div>
                        <div>
                            <span for="cars">Khoa chỉ định : </span>
                            <select id="cars">
                                <option value="null"></option>
                                <option value="volvo">Khoa tiêu hóa</option>
                                <option value="saab">Khoa sản</option>
                                <option value="mercedes">Khoa hô hấp</option>
                                <option value="audi">Khoa ngoại tổng hợp</option>
                            </select>
                        </div>
                    </div>
                    <div style={{ display: "flex", width: "100%", height: "60vh", flex: 1, flexDirection: 'row' }}>
                        <div style={{ display: "flex", flex: 0.5 }}>
                            <Listwait></Listwait>
                        </div>
                        <div style={{ display: "flex", flex: 0.5 }}>
                            <Paitent></Paitent>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}