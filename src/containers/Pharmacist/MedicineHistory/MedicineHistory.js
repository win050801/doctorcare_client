import React, { Component,useState,useEffect } from "react";
import { Button } from "reactstrap";
import Navbar from "../../Menu/Navbar";
import './MedicineHistory.scss';
import { Link } from 'react-router-dom';

import { Input, Table,Select,DatePicker } from 'antd';
import { useParams } from 'react-router-dom';
import axios from "../../../axios";
// import axios from "axios";

const MedicineHistory = () =>{

      const { id } = useParams();

      const [medicineData, setMedicineData] = useState([]);

      const [fromDate, setFromDate] = useState("");

      const [toDate, setToDate] = useState("");

      const [search, setSearch] = useState({
            fromDate: "",
            toDate: "",
            status: 1
      });

      useEffect(() => {
            const fetchMedicineData = async () => {
                  const response = await axios.get(`http://localhost:9000/api/medicines/history`, {
                  params:{
                  medicine_id: id,
                  status: search.status,
                  key_search: "",
                  from_date: search.fromDate,
                  to_date: search.toDate,
                  }
                  });
                  setMedicineData(response.data);
                  console.log(response);
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
            dataIndex: 'warehouse_session_status',
            key: 'age',
      },
      {
            title: 'Số lượng',
            dataIndex: 'warehouse_session_status',
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
                                                <h5>Tên thuốc</h5>
                                                <div style={{display:'flex', marginTop: '20px' }}>
                                                      <div>
                                                            <label><h5>Từ: </h5></label>
                                                            <DatePicker onChange={onChangeFromDate} />
                                                      </div>
                                                      <div style={{marginLeft:'20px'}}>
                                                            <label><h5>Đến: </h5></label>
                                                            <DatePicker onChange={onChangeToDate} />
                                                      </div>
                                                      <Button className="btn-see" >Xem</Button>
                                                </div>
                                                <div className="medicine-history-table">
                                                      <Table responsive  dataSource={medicineData} columns={columns}  >
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
