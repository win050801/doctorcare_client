import React, { Component,useState,useEffect } from "react";
import Navbar from "../Menu/Navbar";
import {Line} from '@ant-design/charts';
import { Chart } from "react-google-charts";
import { Table,DatePicker, Select} from "antd";
import Aside from "./Aside";
import axios from 'axios';

export const options = {
    chart: {
      title: "Thống kê",
      subtitle: "Xuất kho thuốc",
    },
};  

function  ReportExport(){
    const [search, setSearch] = useState({
        report_type: 3,
        from_date: "2023-03-01",
        to_date: "2023-06-01"
      });
    
    const [report, setReport] = useState([]);

    const [type, setType] = useState(1);

    const [newData, setNewData] = useState([]);

    const newArray = [
      [],
      []
    ]

    const [typeReport, setTypeReport] = useState(1);

    useEffect(() => {
        const fetchCategoryData = async () => {
          const response = await axios.get(`http://localhost:9000/api/reports/best-seller/`, {
                params:{
                  from_date: search.from_date,
                  to_date: search.to_date,
                }
            });
            setReport(response.data.data.list);
          };
          fetchCategoryData();
    }, [search]);

    const data2 = [
        ["Panadol", "a", "Ho", "Cảm", "Đau đầu", "Đau bụng", "Buồn nôn", "Khó tiêu", "Sổ mũi", "Chóng mặt", "Ngạt mũi"],
        [ 1000, 400, 200, 566, 778, 675, 567, 456, 899, 456, 944],
    ];
    
    const data = [
      [],
      []
    ]

    report.forEach(item => {
        data.push([
          item.name,
          item.total_quantity,
        ])
    })

    for (let i = 2; i < data.length; i++) {
      const element = data[i];
      newArray[0].push(element[0]);
      newArray[1].push(element[1]);
    }

    console.log(newArray);

    console.log(data);

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
   return (
           <React.Fragment>
            <div className="report-type" style={{ display: 'flex' }}>
                
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
                                                    data={newArray}
                                                    options={options}
                                />
                            </div>
                          </div>
                              
                              
                        
                      </div>
                      
                    </div>
                   
                 </div>
                 <Aside/>
                </div>  
                {/* <div style={{width:1000,height:500,marginLeft:150,marginTop:50}}>
                <Chart
                    chartType="Bar"
                    width="100%"
                    height="400px"
                    data={data}
                    options={options}
                />
                </div> */}
       
            
           </React.Fragment>
       );
  
}

export default (ReportExport);
