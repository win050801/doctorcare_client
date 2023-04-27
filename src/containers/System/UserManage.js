import React, { Component, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Menu from '../Menu/Navbar';
import Search from '../../components/Search/Search';
import Getsick from '../../components/Getsick/Getsick';
import Infopaitent from '../../components/Infopaitent/Infopaitent';
import { Alert } from 'antd';
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
                        <Infopaitent></Infopaitent>
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
