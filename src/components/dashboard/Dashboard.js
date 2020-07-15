import React, { Component } from 'react';
import SideMenuBar from '../sideMenuBar/SideMenuBar';

class Dashboard extends Component {

    render() {
        return (
            <div className="row">
                <SideMenuBar />
                <div className="col s8">
                    <h1>Dashboard working!</h1>
                </div>
            </div>
        )
    }
}

export default Dashboard;
