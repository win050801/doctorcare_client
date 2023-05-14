import React, { Component,useState,useEffect } from "react";
import { Button } from "reactstrap";
import Navbar from "../../Menu/Navbar";
import '../MedicineHistory/MedicineHistory.scss';
import { Link } from 'react-router-dom';

import { Input, Table,Select,DatePicker } from 'antd';
import { useParams } from 'react-router-dom';
import axios from "../../../axios";
// import axios from "axios";

const AllMedicinesHistory = () =>{


      const [medicineData, setMedicineData] = useState([]);

      const [fromDate, setFromDate] = useState("");

      const [limit, setLimit]  = useState(6);

      const [page, setPage]  = useState(1);

      const [total, setTotal] = useState(0);

      const [toDate, setToDate] = useState("");

      const [search, setSearch] = useState({
            medicineId : -1,
            status: -1,
            fromDate: "",
            toDate: "",
            keySearch: "",
            limit: limit,
            page: page
      });

      useEffect(() => {
            const fetchMedicineData = async () => {
                  const response = await axios.get(`http://localhost:9000/api/medicines/history`, {
                  params:{

                        medicine_id: search.medicineId,
                        status: search.status,
                        key_search: "",
                        from_date: search.fromDate,
                        to_date: search.toDate,
                  }
                  });
                  const sttStart = (page - 1) * limit + 1;

                  const medicineDataWithStt = response.data.list.map((medicine, index) => {
                        const stt = sttStart + index;
                        return { ...medicine, stt };
                  });

                  setMedicineData(medicineDataWithStt);
                  setTotal(response.data.total_record);
            };
      
      fetchMedicineData();
      }, [search]);
          
      const onChangeFromDate = (date, dateString) => {
            setSearch({ ...search, fromDate: dateString });
      };
      
      const onChangeToDate = (date, dateString) => {
            setSearch({ ...search, toDate: dateString });
      };
      

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
            dataIndex: "warehouse_session_status",
            key: 'age',
      },
      {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'age',
      },
      {
            title: "Chi tiết",
            dataIndex: 'description',
            key: 'description',
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
                                                <div className="search-content">
                                                      <div>
                                                            <h5>Từ khóa </h5>
                                                            <Input  name="keySearch" type="text" className="input-search key"placeholder="Tìm kiếm thuốc"></Input>
                                                      </div>
                                                      <div>
                                                            <h5>Danh mục thuốc </h5>
                                                            <Select name="categoryId"  className="input-search-type" id="cars"  placeholder="Tất cả">
                                                            {/* {categoryData.map(option => (
                                                            <option key={option.id} value={option.id}>
                                                                  {option.name}
                                                            </option>
                                                            ))} */}
                                                            </Select>
                                                      </div>
                                                     
                                                      <div>
                                                            <h5>Sắp xếp theo </h5>
                                                            <Select  name="sortBy"  className="input-search sort" id="cars" placeholder="Chọn">
                                                                  <option value="0">Tất cả</option>
                                                                  <option value="1">Tên thuốc (Tăng dần)</option>
                                                                  <option value="2">Tên thuốc (giảm dần)</option>
                                                                  <option value="3">Ngày nhập kho (tăng dần)</option>
                                                                  <option value="4">Ngày nhập kho (giảm dần)</option>
                                                                  <option value="5">Số lượng  (tăng dần)</option>
                                                                  <option value="6">Số lượng  (giảm dần)</option>
                                                            
                                                            </Select>
                                                      </div>
                                           
                                                      <div>
                                                            <h5>Từ: </h5>
                                                            <DatePicker onChange={onChangeFromDate} />
                                                      </div>
                                                      
                                                      <div style={{marginLeft:'20px'}}>
                                                            <h5>Đến: </h5>
                                                            <DatePicker onChange={onChangeToDate} />
                                                      </div>
                                             
                                        </div>
                                                
                                                <div className="medicine-history-table">
                                                      <Table 
                                                            responsive  
                                                            dataSource={medicineData} 
                                                            columns={columns}  
                                                            pagination={{
                                                                  // current: page,
                                                                  pageSize: limit,
                                                                  total: total,
                                                                }}
                                                            >
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
export default AllMedicinesHistory;
