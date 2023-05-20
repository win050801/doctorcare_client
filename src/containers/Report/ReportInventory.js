import React, { Component,useState,useEffect } from "react";
import Navbar from "../Menu/Navbar";
import {Line} from '@ant-design/charts';
import { Chart } from "react-google-charts";

export const data = [
    ["Month", "Nhập kho", "Xuất kho", "Tồn kho"],
    ["01", 1000, 400, 200],
    ["02", 1170, 460, 250],
    ["03", 660, 1120, 300],
    ["04", 1030, 540, 350],
    ["05", 1030, 540, 350],
    ["06", 1030, 540, 350],
    ["07", 1030, 540, 350],
    ["08", 1030, 540, 350],
    ["09", 1030, 540, 350],
    ["10", 1030, 540, 350],
    ["11", 1030, 540, 350],
    ["12", 1030, 540, 350],
];

export const options = {
    chart: {
      title: "Thống kê tồn kho",
      subtitle: "Nhập, Xuất, and Tồn",
    },
};  

function  ReportInventory(){
   return (
           <React.Fragment>
            <div style={{ display: 'flex' }}>
                <Navbar/>
                <div style={{width:1200,height:500,marginLeft:50,marginTop:50}}>
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

export default (ReportInventory);
