import React, { Component,useState,useEffect } from "react";
import Navbar from "../Menu/Navbar";
import {Line} from '@ant-design/charts';
import { Chart } from "react-google-charts";

export const data = [
    ["Month", "Nhập", "Xuất"],
    ["01", 1000, 400],
    ["02", 1170, 460],
    ["03", 660, 1120],
    ["04", 1030, 540],
    ["05", 453, 125],
    ["06", 553, 453],
    ["07", 1285, 786],
    ["08", 566, 456],
    ["09", 867, 389],
    ["10", 995, 589],
    ["11", 1111, 899],
    ["12", 1222, 955],
];

export const options = {
    chart: {
      title: "Thống kê nhập, xuất kho",
      subtitle: "Nhập, Xuất",
    },
};  

function  ReportExportInventory(){
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

export default (ReportExportInventory);
