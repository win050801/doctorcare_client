
import { useState } from "react"
import "../../components/UIDoctor/UIdoctor.scss"
import MenuDoctor from "../MenuDoctor/MenuDoctor"
import UIKham from "../UIKham/UIKham"
import Navbar from "../../containers/Menu/Navbar"
import { Redirect } from 'react-router-dom';
export default function UIdoctor() {
    const user = localStorage.getItem("currentUser")
    console.log(user);
    const [patient, setPatient] = useState({ name: "", address: "", phone: "", weight: "", height: "" })
    return (
        <>
            {
                user !== "logout" ? (
                    <div className="doctorContainer">
                        <Navbar></Navbar>
                        <MenuDoctor patient={patient} setPatient={setPatient}></MenuDoctor>
                        <UIKham patient={patient} setPatient={setPatient}></UIKham>

                    </div>

                ) : (
                    <Redirect to="/login" />
                )
            }
        </>
    )
}