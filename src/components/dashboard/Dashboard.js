import React, { Component } from 'react';
import SideMenuBar from '../sideMenuBar/SideMenuBar';
import AddCategoryModal from './addCategoryModal/AddCategoryModal';
// import EditCategoryModal from './editCategoryModal/EditCategoryModal';
import M from "materialize-css";
import { Redirect } from 'react-router-dom';
import '../dashboard/dashboard.css';
const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';

class Dashboard extends Component {
    state = {
        categories: [],
        chores: [],
        categoryName: '',
        users: []
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
                this.setState({ 
                    categoryName: category.category_name,
                    users: category.username });
            })
            .catch(err => {
                console.log(err);
            });
        }
    }

    handleOpenModal = (event, modal, category = {}) => {
        event.preventDefault();
        if(modal === '.editModal' && category) {
            for(let x = 0; x < this.state.categories.length; x++) {
                if(category.id === this.state.categories[x].id) {
                    console.log(category);
                    this.updateUsersIdToEmail(category);
                }
            }
        }

        let elem = document.querySelector(modal);
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

    handleCategoryNameInputEdit = (event) => {
        this.setState({ categoryName: event.target.value });
    }

    handleCategoryUsernameInputEdit = (event, usernameIndex) => {
        this.setState({ users: event.target.value });
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

                {/* {this.state.categoryToBeEditedId > -1 ? 
                    <EditCategoryModal categoryToBeEditedId={this.state.categoryToBeEditedId}
                    handleCategoryNameInputEdit={this.handleCategoryNameInputEdit}/>
                    :
                    <div></div>
                } */}
                <div id="modal1" className="modal editModal modal-fixed-footer">
                <div className="modal-content">
                    <div className='row'>
                        <div className='col s8 offset-s2'>
                            <input type="text" name="categoryName" id="categoryName" 
                            value={this.state.categoryName}
                            onChange={this.handleCategoryNameInputEdit}
                            required/>
                            <label htmlFor='categoryName'>Category Name</label>
                        </div>

                        {this.state.users 
                        ? 
                            this.state.users.map((username, index) => (
                                <div className='row' key={index}>
                                 <div className='col s7 offset-s2' id='editUserInputDiv'>
                                    <input placeholder={username} type="text" name="userName" id={`userName_${index}`} 
                                    value={username}
                                    onChange={(e) => {this.handleCategoryUsernameInputEdit(e, index)}}
                                    />
                                    <label htmlFor='userName'>Username</label>
                                </div>
                                <button type='submit' className='btn-floating col s1 red' id='removeUserBtn'
                                // onClick={(e) => {props.handleRemoveUser(e, props.i)}}
                                >
                                    <i className="material-icons left">remove</i>
                                </button> 
                            </div>
                            ))
                        : 
                            <div></div>
                        }
                        
                        <div className='col s8 offset-s2'>
                            <button className='btn btn-large' onClick={(e) => {this.handleAddUser(e)}}>Add User</button>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat"
                    // onClick={(e) => {this.props.handleSaveCategory(e, this.state.addUserInputs, this.state.categoryNameInput)}}
                    >Save</a>
                </div>
            </div>

            </div>
                            
            // </div>
        )
    }
}

export default Dashboard;
