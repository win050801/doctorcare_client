
import { useState } from "react"
import "../../components/UIDoctor/UIdoctor.scss"
import MenuDoctor from "../MenuDoctor/MenuDoctor"
import UIKham from "../UIKham/UIKham"
import Navbar from "../../containers/Menu/Navbar"
export default function UIdoctor()
{
    const [patient,setPatient]=useState({name:"",address:"",phone:"",weight:"",height:""})
    return(
        <div className="doctorContainer">
                <Navbar></Navbar>
                <MenuDoctor patient={patient} setPatient={setPatient}></MenuDoctor>
                <UIKham patient={patient} setPatient={setPatient}></UIKham>
            
        </div>
    )
}