
import Navbar from "../../containers/Menu/Navbar"
import MenuDoctor from "../MenuDoctor/MenuDoctor"
import MenuDoctorSieuAm from "../MenuDoctorSieuAm/MenuDoctorSieuAm"
import UIKham from "../UIKham/UIKham"
import UIKhamSieuam from "../UIKhamsieuam/UIKhamsieuam"
import "../UISieuam/UISieuam.scss"
import { Redirect } from 'react-router-dom';
import { useState } from "react"
export default function UISieuam() {
    const user = localStorage.getItem("currentUser")
    const [patient, setPatient] = useState({ name: "", address: "", phone: "", weight: "", height: "" })
    return (
        <>
            {
                user !== "logout" ? (<>
                    <div className="doctorSieuam">
                        <Navbar></Navbar>
                        <MenuDoctorSieuAm patient={patient} setPatient={setPatient}></MenuDoctorSieuAm>
                        <UIKhamSieuam patient={patient} setPatient={setPatient}></UIKhamSieuam>

                    </div>
                </>) : (<>
                    <Redirect to="/login" />
                </>)
            }
        </>
    )
}