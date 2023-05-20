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

      const [categoryData,setCategoryData] = useState([]);

      const [medicineData, setMedicineData] = useState([]);

      const [fromDate, setFromDate] = useState("");

      const [limit, setLimit]  = useState(6);

      const [categoryId, setCategoryId] = useState(-1);

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
              const response = await axios.get(`http://localhost:9000/api/categories/`, {});
              setCategoryData(response.data);
            };
            fetchMedicineData();
          }, []);

          useEffect(() => {
            const fetchMedicineData = async () => {
              const response = await axios.get(`http://localhost:9000/api/medicines/history`, {
                params: {
                  medicine_id: search.medicineId,
                  status: search.status,
                  key_search: search.keySearch,
                  from_date: search.fromDate,
                  to_date: search.toDate,
                },
              });
          
              const { list: medicineList, total_record: total } = response.data;
              const startIndex = (page - 1) * limit + 1;
          
              const medicineDataWithStt = medicineList.map((medicine, index) => ({
                ...medicine,
                stt: startIndex + index,
              }));
          
              setMedicineData(medicineDataWithStt);
              setTotal(total);
              console.log(medicineDataWithStt);
            };
          
            fetchMedicineData();
          }, [search, page, limit]);
          
          
      const onChangeFromDate = (date, dateString) => {
            setSearch({ ...search, fromDate: dateString });
      };

      
      const onChangeToDate = (date, dateString) => {
            setSearch({ ...search, toDate: dateString });
      };
      
      const columns = [
      {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            width: "5%"
      },
      {
            title: 'Hình ảnh',
            dataIndex: 'avatar',
            width: "12%",
            key: 'name',
            render: (avatar) => (
                  <td className="img-cell">
                    <img src={avatar} alt="Hình ảnh" style={{ width: '100px' }} />
                  </td>
                ),
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

      const handleInputChange = (event) => {
            console.log(event.target.value);
            setSearch({ ...search, keySearch: event.target.value });
      };
          

      const handleSelectChangeCategory = (value) => {
            setCategoryId(`${value}`)
            setSearch({ ...search, categoryId: value });
      }

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
                                                            <Input onChange={handleInputChange} name="keySearch" type="text" className="input-search key"placeholder="Tìm kiếm thuốc"></Input>
                                                      </div>
                                                      <div>
                                                            <h5>Danh mục thuốc </h5>
                                                            <Select onChange={handleSelectChangeCategory} name="categoryId"  className="input-search-type" id="cars"  placeholder="Tất cả">
                                                            {categoryData.map(option => (
                                                            <option key={option.id} value={option.id}>
                                                                  {option.name}
                                                            </option>
                                                            ))}
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
                                                      <Link to={"/pharmacist"}>
                                                            <Button  Button  color="warning" className="btn-back">Quay về kho thuốc</Button>
                                                      </Link>
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
