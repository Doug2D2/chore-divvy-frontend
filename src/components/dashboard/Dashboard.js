import React, { Component } from 'react';
import SideMenuBar from '../sideMenuBar/SideMenuBar';
import { Redirect } from 'react-router-dom';
const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';

class Dashboard extends Component {
    state = {
        categories: [],
        chores: [],
        isLoggedIn: true
    }

    componentDidMount() {
        this.user = JSON.parse(localStorage.getItem('user'));
        if(!this.user) {
            this.setState({ isLoggedIn: false });
        }
        this.getCategories();
    }

    getCategories() {
        if(this.user) {
            fetch(`${baseUrl}/get-categories-by-userId/${this.user.userId}`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                this.setState({ categories: data })
                this.getChores();
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    getChores() {
        console.log('get chores', this.state.categories);
        fetch(`${baseUrl}/get-chores-by-categoryId/${this.state.categories[0].id}`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                this.setState({ chores: data });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        if(!this.state.isLoggedIn) {
            return <Redirect push to='/' />
        }

        return (
            <div className="row">
                <SideMenuBar categories={this.state.categories}/>
                <div className="col s8">
                    <ul>
                        {this.state.chores.map(chore => (
                            <li key={chore.id}>{chore.chore_name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Dashboard;
