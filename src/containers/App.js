import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';


import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

import { path } from '../utils'

import Home from '../routes/Home';
import Login from '../routes/Login';
import Header from './Header/Header';
import System from '../routes/System';

import { CustomToastCloseButton } from '../components/CustomToast';
import Pharmacist from './Pharmacist/Pharmacist';
import MedicineDetail from './Pharmacist/MedicineDetail/MedicineDetail';
import MedicineHistory from './Pharmacist/MedicineHistory/MedicineHistory';
import MedicineWarning from './Pharmacist/MedicineWarning/MedicineWarning';
import AllMedicinesHistory from './Pharmacist/AllMedicineHistory/AllMedicine';
<<<<<<< HEAD

=======
>>>>>>> trongphan
import Report from './Report/Report';
import ReportRevenueCostProfit from './Report/ReportRevenueCostProfit';
import ReportPatientList from './Report/ReportPatientList';
import ReportExport from './Report/ReportExport';
import ReportInventory from './Report/ReportInventory';
import ReportExportInventory from './Report/ReportExportInventory';
import AppProvider from './Pharmacist/Warehouse/AppContext';
import Warehouse from './Pharmacist/Warehouse/Warehouse';


<<<<<<< HEAD

=======
>>>>>>> trongphan

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <AppProvider>
                        <div className="main-container">
                    
                            {this.props.isLoggedIn && <Header />}

<<<<<<< HEAD
                        <span className="content-container">
                            <Switch>
                                <Route path={path.HOME} exact component={(Home)} />
                                <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                <Route path={path.PHARMACIST} component={(Pharmacist)} />
                                <Route path="/medicine/detail/:id" component={(MedicineDetail)} />
                                <Route path="/medicine/:id/history" component={(MedicineHistory)} />
                                <Route path="/medicine/warning" component={(MedicineWarning)} />

                                <Route path="/medicine/history" component={(AllMedicinesHistory)} />
                                <Route path="/report" component={(Report)} />
                                <Route path="/report-revenue-cost-profit" component={(ReportRevenueCostProfit)} />
                                <Route path="/report-patient-list" component={(ReportPatientList)} />
                                <Route path="/report-export" component={(ReportExport)} />
                                <Route path="/report-inventory" component={(ReportInventory)} />
                                <Route path="/report-export-inventory" component={(ReportExportInventory)} />
                            </Switch>
                        </span>
=======
                            <span className="content-container">
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={path.PHARMACIST} component={(Pharmacist)} />
                                    <Route path="/medicine/detail/:id" component={(MedicineDetail)} />
                                    <Route path="/medicine/:id/history" component={(MedicineHistory)} />
                                    <Route path="/medicine/warning" component={(MedicineWarning)} />
>>>>>>> trongphan

                                    <Route path="/medicine/history" component={(AllMedicinesHistory)} />
                                    <Route path="/report" component={(Report)} />
                                    <Route path="/report-revenue-cost-profit" component={(ReportRevenueCostProfit)} />
                                    <Route path="/report-patient-list" component={(ReportPatientList)} />
                                    <Route path="/report-export" component={(ReportExport)} />
                                    <Route path="/report-inventory" component={(ReportInventory)} />
                                    <Route path="/report-export-inventory" component={(ReportExportInventory)} />

                                </Switch>
                            </span>

                            <ToastContainer
                                className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                                autoClose={false} hideProgressBar={true} pauseOnHover={false}
                                pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                                closeButton={<CustomToastCloseButton />}
                            />
                        </div>
                        <Warehouse />
                    </AppProvider>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.admin.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);