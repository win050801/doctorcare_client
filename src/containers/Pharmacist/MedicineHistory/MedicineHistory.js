import React, { Component,useState } from "react";
import { Button } from "reactstrap";
import Navbar from "../../Menu/Navbar";
import './MedicineHistory.scss';
import { Link } from 'react-router-dom';

import { Input, Table,Select,DatePicker } from 'antd';

const MedicineHistory = () =>{
      const onChange =(date, dateString) => {
            console.log(date, dateString);
      }

      const dataSource = [
            {
              key: '1',
              name: 'John Brown',
              stt: '1',
              age: 32,
              address: 'New York No. 1 Lake Park',
              actions: (
                <span>
                  <Link to="/medicine/detail"> 
                      <Button style={{backgroundColor:'#3c8dbc', color: 'white', fontSize: '15px'}}
                      >
                        Chi tiết</Button>
                  </Link>
                  <Link to="/medicine/history">
                      <Button style={{backgroundColor:'#00a65a', color: 'white', fontSize: '15px'}}>Lịch sử</Button>
                  </Link>
                  
                  <Button style={{backgroundColor:'red', color: 'white', fontSize: '15px'}}>Xóa</Button>
                </span>
              ),
            },
          ];
      
          const columns = [
            {
              title: 'STT',
              dataIndex: 'stt',
              key: 'stt',
            },
            {
              title: 'Ngày thực hiện',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Hoạt động',
              dataIndex: 'age',
              key: 'age',
            },
            {
              title: "Chi tiết",
              dataIndex: 'address',
              key: 'address',
            },
            
          ];

      return(
         <>
            <div>
                   <div style={{ display: 'flex' }}>
                        <Navbar/>
                        <div className="warehouse-container">
                              <div className="warehouse-content">
                                    <div className="title-warehouse">
                                          <h3>Lịch sử sử dụng thuốc</h3>
                                    </div>
                                    <div className="form-warehouse">
                                    
                                    {/* body */}
                                          <div className="box-body">
                                                <h5>Tên thuốc</h5>
                                                <div style={{display:'flex', marginTop: '20px' }}>
                                                      <div>
                                                            <label><h5>Từ: </h5></label>
                                                            <DatePicker onChange={onChange} />
                                                      </div>
                                                      <div style={{marginLeft:'20px'}}>
                                                            <label><h5>Đến: </h5></label>
                                                            <DatePicker onChange={onChange} />
                                                      </div>
                                                      <Button className="btn-see" >Xem</Button>
                                                </div>
                                                <div className="medicine-history-table">
                                                      <Table responsive  dataSource={dataSource} columns={columns}  >
                                                      </Table>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        
                        </div>
                  </div>
            </div>
         </>
      )
}
export default MedicineHistory;
