import React, { Component } from 'react';
import '../sideMenuBar/SideMenuBar.css';
const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';

class SideMenuBar extends Component {
    state = {
        categories: []
    }

    componentDidMount() {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.getCategories();
    }

    getCategories() {
        console.log('fetch', this.user.userId);
        fetch(`${baseUrl}/get-categories-by-userId/${this.user.userId}`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                this.setState({ categories: data })
                //console.log(this.state.categories);
            })
            .catch(err => {
                console.log(err);
            })
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
