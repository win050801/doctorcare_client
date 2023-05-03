
import { useState } from "react"
import "../../components/UIDoctor/UIdoctor.scss"
import MenuDoctor from "../MenuDoctor/MenuDoctor"
import UIKham from "../UIKham/UIKham"
export default function UIdoctor()
{
    const [patient,setPatient]=useState({name:"thang"})
    return(
        <div className="doctorContainer">
            
                <MenuDoctor patient={patient} setPatient={setPatient}></MenuDoctor>
                <UIKham patient={patient} setPatient={setPatient}></UIKham>
            
        </div>
    )
}