import React, { Component,useState,useEffect } from "react";
import Navbar from "../Menu/Navbar";
import {Line} from '@ant-design/charts'
import { Table,DatePicker, Select} from "antd";
import './Report.scss';
import Aside from "./Aside";
import axios from 'axios';


function  Report(){

  const [search, setSearch] = useState({
    report_type: 3,
    from_date: "2023-03-01",
    to_date: "2023-06-01"
  });

  const [report, setReport] = useState([]);

  const [type, setType] = useState(1);

  const [typeReport, setTypeReport] = useState(1);

  useEffect(() => {
    const fetchCategoryData = async () => {
      const response = await axios.get(`http://localhost:9000/api/reports/profit-revenue/`, {
            params:{
              report_type: search.report_type,
              from_date: search.from_date,
              to_date: search.to_date,
            }
        });
        console.log(response);
        setReport(response.data.data);
        console.log(report);
      };
      fetchCategoryData();
  }, [search]);
      
    const columns = [
        {
          title: 'Thời gian',
          dataIndex: 'date',
          key: 'name',
        },
        {
          title: 'Doanh thu',
          dataIndex: 'revenue',
          key: 'revenue',
          render: (text) => {
            return (
              <span>
                {parseFloat(text).toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </span>
            );
          },
        },
        {
          title: 'Chi phí',
          dataIndex: 'cost',
          key: 'profit',
          render: (text) => {
            return (
              <span>
                {parseFloat(text).toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </span>
            );
          },
        },
        {
          title: 'Lợi nhuận',
          dataIndex: 'profit',
          key: 'profit',
          render: (text) => {
            return (
              <span>
                {parseFloat(text).toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </span>
            );
          },
        },
    ];

    const data = report.map(item => ({
      date: item.date,
      revenue: item.revenue,
      cost: item.cost,
      profit: item.profit
    }));

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
    const configuracion = {
      data,
      title: {
        visible: true,
        text: "Gloves de Lionel Messi por Temporada"
      },
      xField: 'date',
      yField: 'revenue',
      // yField: type === 1 ? 'revenue' : (type === 2 ? 'cost' : 'profit'),
      color: '#2593fc',
      point: {
        visible: true,
        size: 5,
        shape: 'diamond',
        style: {
          fill: 'red',
          stroke: '#2539fc',
          lineWidth: 2
        }
      }
    };
    

    // const onChangeFromDate = (date, dateString) => {
    //   setSearch({ ...search, fromDate: dateString });
    // };

    // const onChangeToDate = (date, dateString) => {
    //   setSearch({ ...search, toDate: dateString });
    // };
    
   return (
           <React.Fragment>
            <div className="report-type" style={{ display: 'flex' }}>
                <Navbar/>
                <div className="getsick">
                  <div className="containergetsick">
                      <div className="info">
                          
                          <div style={{display:'flex', marginTop: '0px', alignItems:'center' }}>
                          <label label className="label-report-z">Số tiền gần đây</label>
                                                      <div style={{marginLeft:'50px'}}>
                                                            <label><h5>Từ: </h5></label>
                                                            <DatePicker onChange={onChangeFromDate} />
                                                      </div>
                                                      <div style={{marginLeft:'20px'}}>
                                                            <label><h5>Đến: </h5></label>
                                                            <DatePicker onChange={onChangeToDate} />
                                                      </div>
                                                      <div style={{marginLeft:'20px', width:" 250"}}>
                                                          
                                                            <Select onChange={handleSelectChange}  name="sortBy"  style={{ width:" 250"}} id="cars" placeholder="Kiểu báo cáo">
                                                                  <option value="1">Theo Giờ</option>
                                                                  <option value="2">Theo Ngày</option>
                                                                  <option value="3">Theo Tháng</option>
                                                                  <option value="4">Theo Năm</option>
                                                            </Select>
                                                      </div>
                                                      <div style={{marginLeft:'20px', width:" 100px"}}>
                                                          
                                                            <Select onChange={handleSelectChangeTypeMoney}  name="sortBy"  style={{ width:" 100px"}} id="cars" placeholder="Dạng">
                                                                  <option value="1">Doanh Thu</option>
                                                                  <option value="2">Chi phí</option>
                                                                  <option value="3">Lợi nhuận</option>
                                                            </Select>
                                                      </div>
                                                </div>
                          <div style={{marginTop:"5px"}} className="report" >
                            <div style={{width:1000,height:250}}>
                                <Line {...configuracion} />
                            </div>
                            <div style={{marginTop:50}}>
                              <Table className="table-antd" dataSource={report} columns={columns} pagination={{ showPagination: false,pageSize :5 }} />

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

export default (Report);
