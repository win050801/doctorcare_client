import React, { Component,useState,useEffect } from "react";
import Navbar from "../Menu/Navbar";
import {Line} from '@ant-design/charts';
import { Chart } from "react-google-charts";

export const data = [
    ["Year", "Panadol", "Tipphi", "Ho", "Cảm", "Đau đầu", "Đau bụng", "Buồn nôn", "Khó tiêu", "Sổ mũi", "Chóng mặt", "Ngạt mũi"],
    ["2014", 1000, 400, 200, 566, 778, 675, 567, 456, 899, 456, 944],
];

export const options = {
    chart: {
      title: "Thống kê",
      subtitle: "Xuất kho thuốc",
    },
};  

function  ReportExport(){
   return (
           <React.Fragment>
            <div style={{ display: 'flex' }}>
                <Navbar/>
                <div style={{width:1000,height:500,marginLeft:150,marginTop:50}}>
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

export default (ReportExport);
