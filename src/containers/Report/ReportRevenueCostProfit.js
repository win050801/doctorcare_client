import React, { Component,useState,useEffect } from "react";
import Navbar from "../Menu/Navbar";
import {Line} from '@ant-design/charts';
import { Chart } from "react-google-charts";

export const data = [
    ["Year", "Doanh thu", "Chi phí", "Lợi nhuận"],
    ["2014", 1000, 400, 200],
    ["2015", 1170, 460, 250],
    ["2016", 660, 1120, 300],
    ["2017", 1030, 540, 350],
];

export const options = {
    chart: {
      title: "Thống kê",
      subtitle: "Doanh thu, Chi phí, and Lợi nhuận",
    },
};  

function  ReportRevenueCostProfit(){
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

export default (ReportRevenueCostProfit);
