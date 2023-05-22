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

      const [limit, setLimit]  = useState(6);

      const [page, setPage]  = useState(1);

      const [total, setTotal] = useState(0);

      const [fromDate, setFromDate] = useState("");

      const [toDate, setToDate] = useState("");

      const [search, setSearch] = useState({
            fromDate: "",
            toDate: "",
            status: -1
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
      
      const columns = [
      {
            title: 'STT',
            dataIndex: 'stt',
            width: "5%",
            key: 'stt',
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
            with: "15%"
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

      const handleSelectChange = (value) => {
            setSearch({ ...search, status: value });
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
                                                <div style={{display:'flex', marginTop: '20px' }}>
                                                      <div>
                                                            <label><h5>Từ: </h5></label>
                                                            <DatePicker onChange={onChangeFromDate} />
                                                      </div>
                                                      <div style={{marginLeft:'20px'}}>
                                                            <label><h5>Đến: </h5></label>
                                                            <DatePicker onChange={onChangeToDate} />
                                                      </div>
                                                      <div style={{marginLeft:'20px', width:" 283px"}}>
                                                          
                                                            <Select onChange={handleSelectChange}   name="sortBy"  style={{ width:" 283px"}} id="cars" placeholder="Hoạt động">
                                                                  <option value="0">Xuất kho</option>
                                                                  <option value="1">Nhập kho</option>
                                                            </Select>
                                                      </div>
                                                </div>
                                                <div className="medicine-history-table">
                                                      <Table responsive  dataSource={medicineData} columns={columns}  >
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
export default MedicineHistory;
