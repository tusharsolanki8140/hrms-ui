import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

import Employees from "./Employees";

import AppHeader from "../../Layout/AppHeader/";
import AppSidebar from "../../Layout/AppSidebar/";
import AppFooter from "../../Layout/AppFooter/";

const HR = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`${match.url}/employees`} component={Employees}/>
                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default HR;