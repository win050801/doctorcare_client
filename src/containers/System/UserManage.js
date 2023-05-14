import React, { Component, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Menu from '../Menu/Navbar';
import Search from '../../components/Search/Search';
import Getsick from '../../components/Getsick/Getsick';
import Infopaitent from '../../components/Infopaitent/Infopaitent';
import { Alert } from 'antd';
import UIdoctor from '../../components/UIDoctor/UIdoctor';
import UISieuam from '../../components/UISieuam/UISieuam';
class UserManage extends Component {

    componentDidMount() {

    }
    constructor(props) {
        super(props)

        // Set initial state 
        this.state = { get: 0 }

        // Binding this keyword 
        this.updateState = this.updateState.bind(this)
    }

    updateState = (index) => {
        // Changing state 
        this.setState({ get: index })
    }



    render() {

        return (

            <div style={{ display: 'flex' }}>

                <Menu setdata={this.updateState} data={this.state.get}></Menu>
                {this.state.get === 0 ? (<><Search></Search>
                    <Getsick></Getsick></>) : (<>
                        {this.state.get === 3 ? (<><Infopaitent></Infopaitent></>) : (<>
                            {this.state.get === 1 ? (<>
                                <UIdoctor></UIdoctor>
                            </>) : (<>
                                <UISieuam></UISieuam>
                            </>)}


                        </>)}
                    </>)}



            </div>

        );
    }

}

const mapStateToProps = state => {

    return {
    };
};

const mapDispatchToProps = dispatch => {

    return {
    };
};
// const  info = chon => {
//     this.setState({ chose: 3 });

// }

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
