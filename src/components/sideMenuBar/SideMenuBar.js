import React, { Component } from 'react';
import '../sideMenuBar/SideMenuBar.css';
const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';

class SideMenuBar extends Component {
    state = {
        categories: []
    }

    getCategories() {
        fetch(`${baseUrl}/get-categories-by-userId/1`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                this.setState({ categories: data })
            })
            .catch(err => {
                console.log(err);
            })
    }

    componentDidMount() {
        this.getCategories();
    }

    render() {
        return(
            <div className="col s3 sideMenuBar">
                <h1>Categories</h1>
                <ul>
                    {this.state.categories.map(category => (
                        <li key={category.id}>{category.category_name}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default SideMenuBar;
