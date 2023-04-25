import React, { Component } from "react";
import { connect } from "react-redux";

import Navbar from "../Menu/Navbar";
import Warehouse from "./Warehouse/Warehouse";



class Pharmacist extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageApp(language);
    };

    render() {
        return ( 
            <div style={{ display: 'flex' }}>
                    <Navbar/>
                    <Warehouse/>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.admin.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {};

export default connect(mapStateToProps, mapDispatchToProps)(Pharmacist);
