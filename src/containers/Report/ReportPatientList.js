import React, { Component,useState,useEffect } from "react";
import Navbar from "../Menu/Navbar";
import {Line} from '@ant-design/charts';
import { Chart } from "react-google-charts";

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
      title: "Thống kê số bệnh nhân theo ngày của tháng 4 - 2023",
      subtitle: "Số bệnh nhân",
    },
};  

function  ReportPatientList(){
   return (
           <React.Fragment>
            <div style={{ display: 'flex' }}>
                <Navbar/>
                <div style={{width:1200,height:500,marginLeft:50 ,marginTop:50}}>
                <Chart
                    chartType="Bar"
                    width="100%"
                    height="400px"
                    data={data}
                    options={options}
                />
                </div>
            </div>
            
           </React.Fragment>
       );
  
}

export default (ReportPatientList);
