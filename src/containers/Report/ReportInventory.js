import React, { Component,useState,useEffect } from "react";
import Navbar from "../Menu/Navbar";
import {Line} from '@ant-design/charts';
import { Chart } from "react-google-charts";
import { Table,DatePicker, Select} from "antd";
import Aside from "./Aside";

// export 

export const options = {
    chart: {
      title: "Thống kê tồn kho",
    },
};  

function  ReportInventory(){

    const [search, setSearch] = useState({
        report_type: 3,
        from_date: "2023-03-01",
        to_date: "2023-06-01"
      });
    
    const [report, setReport] = useState([]);

    const [type, setType] = useState(1);

    const [typeReport, setTypeReport] = useState(1);

    const onChangeFromDate = (date, dateString) => {
        setSearch({ ...search, from_date: dateString });
        console.log(search);
      };
  
      const onChangeToDate = (date, dateString) => {
            setSearch({ ...search, to_date: dateString });
      };
  
      const handleSelectChange = (value) => {
        setSearch({ ...search, report_type: value });
      }
  
      const handleSelectChangeTypeMoney = (value) => {
        setType(value);
        console.log(report);
        console.log(type);
      }

    const data = [
        ["Month", "Nhập kho", "Xuất kho", "Tồn kho"],
        ["01", 1000, 400, 200],
        ["02", 1170, 460, 250],
        ["03", 660, 1120, 300],
        ["04", 1030, 540, 350],
        ["05", 1030, 540, 350],
        ["06", 1030, 540, 350],
        ["07", 1030, 540, 350],
        ["08", 1030, 540, 350],
        ["09", 1030, 540, 350],
        ["10", 1030, 540, 350],
        ["11", 1030, 540, 350],
        ["12", 1030, 540, 350],
    ];

   return (
           <React.Fragment>
                <div className="report-type" style={{ display: 'flex' }}>
                <Navbar/>
                <div className="getsick">
                  <div className="containergetsick">
                      <div className="info">
                          
                          <div style={{display:'flex', marginTop: '0px', alignItems:'center' }}>
                     
                                                      <div style={{marginLeft:'50px'}}>
                                                            <label><h5>Từ: </h5></label>
                                                            <DatePicker onChange={onChangeFromDate} />
                                                      </div>
                                                      <div style={{marginLeft:'20px'}}>
                                                            <label><h5>Đến: </h5></label>
                                                            <DatePicker onChange={onChangeToDate} />
                                                      </div>
                                                      <div style={{marginLeft:'20px', width:" 250px"}}>
                                                          
                                                            <Select onChange={handleSelectChange}  name="sortBy"  style={{ width:" 250px"}} id="cars" placeholder="Kiểu báo cáo">
                                                                  <option value="1">Theo Giờ</option>
                                                                  <option value="2">Theo Ngày</option>
                                                                  <option value="3">Theo Tháng</option>
                                                                  <option value="4">Theo Năm</option>
                                                            </Select>
                                                      </div>
                                                    
                                                </div>
                          <div style={{marginTop:"5px"}} className="report" >
                            <div style={{width:1000,height:250}}>
                                        <Chart
                                            chartType="Bar"
                                            width="100%"
                                            height="400px"
                                            data={data}
                                            options={options}
                                        />
                            </div>
                          </div>
                              
                              
                        
                      </div>
                      
                    </div>
                   
                 </div>
                 <Aside/>
                </div>            
           </React.Fragment>
       );
  
}

export default (ReportInventory);
