import React, { Component,useState } from "react";
import { Button } from "reactstrap";
import Navbar from "../../Menu/Navbar";

import { Input, Table,Select,DatePicker } from 'antd';

const MedicineHistory = () =>{
      const onChange =(date, dateString) => {
            console.log(date, dateString);
      }

      return(
         <>
               <div>
                  
                        <div style={{ display: 'flex' }}>
                              <Navbar/>
                              <div className="warehouse-container">
                        <div className="warehouse-content">
                              <div className="title-warehouse">
                              <h3>Quản lý kho thuốc'</h3>
                              </div>
                              <div className="form-warehouse">
                              
                              {/* body */}
                              <div className="box-body">
                                    <h5>Tên thuốc</h5>
                                    <div style={{display:'flex',}}>
                                          <div>
                                                <label>Từ</label>
                                                <DatePicker onChange={onChange} />
                                           </div>
                                           <div>
                                                <label>Đến</label>
                                                <DatePicker onChange={onChange} />
                                           </div>
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
