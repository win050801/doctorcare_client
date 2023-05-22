import React, { Component,useState,useEffect } from "react";
import Navbar from "../Menu/Navbar";
import {Line} from '@ant-design/charts'
import { Table } from "antd";
import './Report.scss';


function  Report(){

    const dataSource = [
        {
          key: '1',
          name: 'Mike',
          age: 32,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
      ];
      
      const columns = [
        {
          title: 'Name',
          dataIndex: 'temporada',
          key: 'name',
        },
        {
          title: 'Age',
          dataIndex: 'goles',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
      ];

    const data = [
        {temporada: '2004-01', goles: 500},
        {temporada: '2004-02', goles: 45},
        {temporada: '2004-03', goles: 66},
        {temporada: '2004-04', goles: 67},
        {temporada: '2004-05', goles: 87},
        {temporada: '2004-06', goles: 98},
        {temporada: '2004-07', goles: 94},
        {temporada: '2004-08', goles: 48},
        {temporada: '2004-09', goles: 38},
        {temporada: '2004-10', goles: 29},
        {temporada: '2004-11', goles: 76},
        {temporada: '2004-12', goles: 73},
        {temporada: '2004-13', goles: 56},
        {temporada: '2004-14', goles: 76},
        {temporada: '2004-15', goles: 78},
        {temporada: '2004-16', goles: 85},
        {temporada: '2004-17', goles: 66},
        {temporada: '2004-18', goles: 89},
        {temporada: '2004-19', goles: 56},
        {temporada: '2004-20', goles: 46},
        {temporada: '2004-21', goles: 79},
        {temporada: '2004-22', goles: 57},
        {temporada: '2004-23', goles: 89},
        {temporada: '2004-24', goles: 45},
    ]

    const configuracion = {
        data,
        title: {
            visiable: true,
            text: "Gloves de Lionel Messi por Temporada"
        },
        xField: 'temporada',
        yField: 'goles',
        color: '#2593fc',
        point: {
            visiable: true,
            size: 5,
            shape:'diamond',
            style:{
                fill: 'red',
                stroke: '#2539fc',
                lineWith: 2
            }
        }
    }
    
   return (
           <React.Fragment>
            <div style={{ display: 'flex' }}>
                <Navbar/>
                <div className="report" style={{marginLeft:150,marginTop:50}}>
                    <div style={{width:1000,height:250}}>
                        <Line {...configuracion} />
                    </div>
                    <div style={{marginTop:50}}>
                    <Table className="table-antd" dataSource={data} columns={columns} pagination={{ showPagination: false }} />

                    </div>
                </div>
                
                
            </div>
            
           </React.Fragment>
       );
  
}

export default (Report);
