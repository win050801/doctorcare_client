import React, { Component,useState,useEffect } from "react";
import Navbar from "../Menu/Navbar";
import {Line} from '@ant-design/charts';
import { Chart } from "react-google-charts";
import Aside from "./Aside";
import axios from "axios";
import { Table, DatePicker, Select, Spin, Empty } from "antd";

export const data = [
    ["Day", "Số bệnh nhân"],
    ["01", 1000],
    ["02", 1170],
    ["03", 660],
    ["04", 550],
    ["05", 620],
    ["06", 350],
    ["07", 558],
    ["08", 452],
    ["09", 128],
    ["10", 887],
    ["11", 563],
    ["12", 112],
    ["13", 335],
    ["14", 777],
    ["15", 888],
    ["16", 625],
    ["17", 125],
    ["18", 556],
    ["19", 899],
    ["20", 786],
    ["21", 123],
    ["22", 899],
    ["23", 123],
    ["24", 456],
    ["25", 345],
    ["26", 783],
    ["27", 748],
    ["28", 456],
    ["29", 431],
    ["30", 1225],
    ["31", 1220],
];

export const options = {
    chart: {
    //   title: "Thống kê số bệnh nhân theo ngày của tháng 4 - 2023",
      subtitle: "Số bệnh nhân",
    },
};  

function  ReportPatientList(){

    const [search, setSearch] = useState({
        report_type: 3,
        from_date: "2023-04-20",
        to_date: "2023-08-08"
      });

    const [report, setReport] = useState([]);

    const [type, setType] = useState(1);

    const columns = [
        {
          title: 'Thời gian',
          dataIndex: 'date',
          key: 'name',
        },
        {
            title: 'Số lượng bệnh nhân',
            dataIndex: 'quantity',
            key: 'name',
        },
      ];

    useEffect(() => {
        const fetchCategoryData = async () => {
          const response = await axios.get(`http://localhost:9000/api/reports/patients/`, {
            params: {
              report_type: search.report_type,
              from_date: search.from_date,
              to_date: search.to_date,
            }
          });
          console.log(response);
          setReport(response.data.data);
          console.log(response.data.data);
        };
        fetchCategoryData();
      }, [search]);

      const newArray = report.map((obj) => {
        const date = obj.date;
        const quantity = obj.quantity;
        return [date, quantity];
      });
      
      newArray.unshift(["Ngày", "Số bệnh nhân"]);
      
      console.log(newArray);
    
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
          <Navbar/>
          <div className="getsick">
            <div className="containergetsick report">
              <div className="info">

                <div style={{ display: 'flex', marginTop: '0px', alignItems: 'center' }}>
                  <label label className="label-report-z">Số tiền gần đây</label>
                  <div style={{ marginLeft: '50px' }}>
                    <label><h5>Từ: </h5></label>
                    <DatePicker onChange={onChangeFromDate} />
                  </div>
                  <div style={{ marginLeft: '20px' }}>
                    <label><h5>Đến: </h5></label>
                    <DatePicker onChange={onChangeToDate} />
                  </div>
                  <div style={{ marginLeft: '20px', width: " 250" }}>

                    <Select onChange={handleSelectChange} name="sortBy" style={{ width: " 250" }} id="cars" placeholder="Kiểu báo cáo">
                      <option value="1">Theo Giờ</option>
                      <option value="2">Theo Ngày</option>
                      <option value="3">Theo Tháng</option>
                      <option value="4">Theo Năm</option>
                    </Select>
                  </div>
                  <div style={{ marginLeft: '20px', width: " 100px" }}>

                  </div>
                </div>
                <div style={{ marginTop: "5px" }} className="report" >
                    <div style={{ width: 1000, height: "100px" }}>
                        <Chart
                            chartType="Bar"
                            width="100%"
                            height="300px"
                            data={newArray}
                            options={options}
                        />
                    </div>
                  <div style={{ marginTop: "220px" }}>
                    <Table
                      locale={{
                        emptyText: <Empty description="Không có dữ liệu" />,
                      }}
                      className="table-antd"
                      dataSource={report}
                      columns={columns}
                      pagination={{ showPagination: false, pageSize: 5 }} />

                  </div>
                </div>



              </div>

            </div>

          </div>
          <Aside />
        </div>
            {/* <div style={{ display: 'flex' }}>
                
                <div style={{width:1200,height:500,marginLeft:50 ,marginTop:50}}>
                <Chart
                    chartType="Bar"
                    width="100%"
                    height="400px"
                    data={data}
                    options={options}
                />
                </div>
            </div> */}
            
           </React.Fragment>
       );
  
}

export default (ReportPatientList);
