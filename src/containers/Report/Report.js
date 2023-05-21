import React, { Component,useState,useEffect } from "react";
import Navbar from "../Menu/Navbar";
import {Line} from '@ant-design/charts'



function  Report(){

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
                <div style={{width:1000,height:500,marginLeft:150,marginTop:50}}>
                    <Line {...configuracion} />
                </div>
            </div>
            
           </React.Fragment>
       );
  
}

export default (Report);
