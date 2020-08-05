import React, { Component } from 'react';
import SideMenuBar from '../sideMenuBar/SideMenuBar';
import AddCategoryModal from './addCategoryModal/AddCategoryModal';
import EditCategoryModal from './editCategoryModal/EditCategoryModal';
import M from "materialize-css";
import { Redirect } from 'react-router-dom';
import '../dashboard/dashboard.css';
const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';

class Dashboard extends Component {
    state = {
        categories: [],
        chores: [],
        categoryToBeEdited: {}
    }

    componentDidMount() {
        this.user = JSON.parse(localStorage.getItem('user'));
        if(!this.user) {
            this.props.setIsLoggedIn(false);
        }
        this.getCategories();
    }

    getChores() {
        if(this.categoryId) {
            fetch(`${baseUrl}/get-chores-by-categoryId/${this.categoryId}`)
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
    }

    getCategories() {
        if(this.user) {
            fetch(`${baseUrl}/get-categories-by-userId/${this.user.userId}`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                this.categoryId = localStorage.getItem('categoryId');
                if(!this.categoryId) {
                    localStorage.setItem('categoryId', data[0].id)
                    this.categoryId = localStorage.getItem('categoryId');
                }
                this.getChores();
                this.setState({ categories: data })
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    handleCategoryClick = (event) => {
        event.preventDefault();
        localStorage.setItem('categoryId', event.target.id);
        this.categoryId = localStorage.getItem('categoryId');
        this.getChores();
    }

    handleOpenModal = (event, modal, category = {}) => {
        event.preventDefault();
        let elem = document.querySelector(modal);
        if(modal === '.editModal' && category) {
            for(let x = 0; x < this.state.categories.length; x++) {
                if(category.id === this.state.categories[x].id) {
                    this.setState({ categoryToBeEdited: this.state.categories[x] });
                }
            }
        }
        M.Modal.init(elem, {});
        let instance = M.Modal.getInstance(elem);

        instance.open();
    }

    addNewCategory(categoryName, userIdArr) {
        //API call to add category
        fetch(`${baseUrl}/add-category`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                categoryName: categoryName,
                userIds: userIdArr
            })
        }) 
        .then(res => {
            return res.json();
        })
        .then(newCategoryData => {
            localStorage.setItem('categoryId', newCategoryData.id);
            this.getCategories();
        })
        .catch(err => {
            console.log(err);
        })
    }

    handleSaveCategory = (event, users, categoryName) => {
        event.preventDefault();
        if(categoryName) {
            let userIdArr = [this.user.userId];
            if(users.length > 0) {
                fetch(`${baseUrl}/get-users`)
                .then(res => {
                    return res.json();
                })
                .then(userTable => {
                    for(let x = 0; x < users.length; x++) {
                        for(let y = 0; y < userTable.length; y++) {
                            if(users[x].toLowerCase() === userTable[y].username.toLowerCase()) {
                                userIdArr.push(userTable[y].id);
                            } 
                        }
                    }
                    userIdArr = [...new Set(userIdArr)];
                    this.addNewCategory(categoryName, userIdArr);
                })
                .catch(err => {
                    console.log(err);
                });
            } else {
                this.addNewCategory(categoryName, userIdArr);
            }
        }

    }

    handleDeleteCategory = (event, categoryId) => {
        event.preventDefault();
        if(categoryId) {
            fetch(`${baseUrl}/delete-category/${categoryId}`, {
                method: 'DELETE'
            })
            .then(res => {
                res.json();
                this.getCategories();
            })
            .catch(err => {
                console.log(err);
            });
        }
    }

    handleEditCategory = (event, category) => {

        //Edit Category API
        // if(categoryId) {
        //     fetch(``, {
        //         method: 'PUT',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({

        //         })
        //     })
        //     .then(res => {
        //         console.log(res);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });
        // }
    }

    render() {
        if(!this.props.isLoggedInState) {
            return <Redirect push to='/' />
        }

        return (
            <div className="row">
                <SideMenuBar categories={this.state.categories}
                handleCategoryClick={this.handleCategoryClick}
                handleOpenModal={this.handleOpenModal}
                handleDeleteCategory={this.handleDeleteCategory}/>

                <div className="col s8">
                    <ul>
                        {this.state.chores.map(chore => (
                            <li key={chore.id}>{chore.chore_name}</li>
                        ))}
                    </ul>
                </div>

                <AddCategoryModal handleSaveCategory={this.handleSaveCategory}/>
                <EditCategoryModal categoryToBeEdited={this.state.categoryToBeEdited}/>

            </div>
        )
    }
}

export default Dashboard;
