import React, { Component } from 'react';
import '../sideMenuBar/SideMenuBar.css';
const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';

class SideMenuBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="col s3 sideMenuBar">
                <ul>
                    {this.props.categories.map(category => (
                        <li key={category.id}>{category.category_name}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default SideMenuBar;
