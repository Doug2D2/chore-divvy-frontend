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
                console.log(data);
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

    updateUsersIdToEmail(category){
        let usernameArr = [];
        if(category) {
            fetch(`${baseUrl}/get-users`)
            .then(res => {
                return res.json();
            })
            .then(usersTable => {
                for(let x = 0; x < category.user_id.length; x++) {
                    for(let y = 0; y < usersTable.length; y++) {
                        if(usersTable[y].id === category.user_id[x]) {
                            usernameArr.push(usersTable[y].username);
                        }
                    }
                }
                category.username = usernameArr;
                this.setState({ categoryToBeEdited: category });
            })
            .catch(err => {
                console.log(err);
            });
        }
    }

    handleOpenModal = (event, modal, category = {}) => {
        event.preventDefault();
        let elem = document.querySelector(modal);
        if(modal === '.editModal' && category) {
            for(let x = 0; x < this.state.categories.length; x++) {
                if(category.id === this.state.categories[x].id) {
                    this.updateUsersIdToEmail(this.state.categories[x]);
                }
            }
        }
        
        //open modal
        M.Modal.init(elem, {});
        let instance = M.Modal.getInstance(elem);
        instance.open();
    }

    addNewCategory = (categoryName, userIdArr) => {
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

                <AddCategoryModal addNewCategory={this.addNewCategory}/>
                <EditCategoryModal categoryToBeEdited={this.state.categoryToBeEdited}/>

            </div>
        )
    }
}

export default Dashboard;
