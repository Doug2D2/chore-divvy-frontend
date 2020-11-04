import React, { Component } from 'react';
import SideMenuBar from '../sideMenuBar/SideMenuBar';
import AddCategoryModal from './addCategoryModal/AddCategoryModal';
import Chores from './chores/Chores';
import AddChoreModal from './addChoreModal/AddChoreModal';
import M from "materialize-css";
import { Redirect } from 'react-router-dom';
import '../dashboard/dashboard.css';
const validator = require("email-validator");
const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';

class Dashboard extends Component {
    state = {
        categories: [],
        chores: [],
        categoryName: '',
        users: [],
        editSaveBtnDisabled: true,
        invalidUsers: []
    }
    OGCategoryName = '';
    OGUsers = [];
    allUsers = [];

    componentDidMount() {
        this.user = JSON.parse(localStorage.getItem('user'));
        if(!this.user) {
            this.props.setIsLoggedIn(false);
        }
        this.getCategories();
        this.getUsers();
    }

    getChores = () => {
        if(this.categoryId) {
            fetch(`${baseUrl}/get-chores-by-categoryId/${this.categoryId}`)
            .then(res => res.json())
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
            .then(res => res.json())
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

    getUsers() {
        fetch(`${baseUrl}/get-users`)
        .then(res => res.json())
        .then(allUsersFromDB => {
            for(let x = 0; x < allUsersFromDB.length; x++) {
                this.allUsers.push({
                    id: allUsersFromDB[x].id,
                    username: allUsersFromDB[x].username,
                    first: allUsersFromDB[x].first_name,
                    last: allUsersFromDB[x].last_name
                })
            }
        })
        .catch(err => console.log(err));
    }

    handleCategoryClick = (event) => {
        event.preventDefault();
        localStorage.setItem('categoryId', event.target.id);
        this.categoryId = localStorage.getItem('categoryId');
        this.getChores();
    }

    updateUsersIdToEmail(category){
        localStorage.setItem('editCategoryId', category.id);
        let usernameArr = [];
        let currUserId = this.user.userId;
        if(category) {
            for(let x = 0; x < category.user_id.length; x++) {
                for(let y = 0; y < this.allUsers.length; y++) {
                    //if category and usertable id matches && category id isn't loggedin users id
                    if(this.allUsers[y].id === category.user_id[x] && category.user_id[x] !== currUserId) {
                        usernameArr.push(this.allUsers[y].username);
                    }
                }
            }
            category.username = usernameArr;
            this.setState({ 
                categoryName: category.category_name,
                users: category.username 
            });
        }
    }

    handleOpenModal = (event, modal, category = {}) => {
        event.preventDefault();
        if(modal === '.editModal' && category) {
            for(let x = 0; x < this.state.categories.length; x++) {
                if(category.id === this.state.categories[x].id) {
                    this.updateUsersIdToEmail(category);
                }
            }
            this.setState({ editSaveBtnDisabled: true });
            this.OGCategoryName = category.category_name;
            this.OGUsers = [category.user_id].sort();
        }
        let elem = document.querySelector(modal);
        let options = {
            dismissible: false
        }
        M.Modal.init(elem, options);
        let instance = M.Modal.getInstance(elem);

        instance.open();
    }

    handleCloseModal(modal) {
        let elem = document.querySelector(modal);
        M.Modal.init(elem, {});
        let instance = M.Modal.getInstance(elem);
        instance.close();
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
        .then(res => res.json())
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
        this.setState({ categoryName: event.target.value, editSaveBtnDisabled: false });
    }

    handleCategoryUsernameInputEdit = (event, usernameIndex) => {
        let tempUsers = this.state.users;
        tempUsers[usernameIndex] = event.target.value
        this.setState({ users: tempUsers, editSaveBtnDisabled: false });
    }

    handleRemoveUserInEdit = (event, index) => {
        event.preventDefault();
        let tempArr = this.state.users;
        tempArr.splice(index, 1);
        this.setState({ users: tempArr, editSaveBtnDisabled: false });
    }

    handleAddUserClickInEdit = (event) => {
        event.preventDefault();
        let tempArr = this.state.users;
        tempArr.push("");
        this.setState({ users: tempArr })
    }

    isUserArrayNotEqual(editedUserArr) {
        if(this.OGUsers.length !== editedUserArr.length) {
            return true;
        } 
        for(let x = 0; x < editedUserArr.length; x++) {
            if(this.OGUsers[x] !== editedUserArr[x]) {
                return true;
            } 
        }
        return false;
    }

    validateUsernames(users, userIdArr, allUsers) {
        let doesUserExist;
        let isEmailAddressValid;
        let  tempInvalidUserArr = [];

        if(users.length > 0) {
            for(let x = 0; x < users.length; x++) {
                doesUserExist = false;
                isEmailAddressValid = validator.validate(users[x]);
                if(isEmailAddressValid) {
                    for(let y = 0; y < allUsers.length; y++) {
                        if(users[x].toLowerCase() === allUsers[y].username.toLowerCase()) {
                            userIdArr.push(allUsers[y].id);
                            doesUserExist = true;
                            break;
                        } 
                    }
    
                    if(!doesUserExist) {
                        tempInvalidUserArr.push({
                            index: x,
                            errMsg: 'User Does Not Exist'
                        });
                    }
                } else {
                    tempInvalidUserArr.push({
                        index: x,
                        errMsg: 'Invalid Username Format'
                    });
                }
                
            }
        }
        return { tempInvalidUserArr: tempInvalidUserArr, userIdArr: userIdArr };
    }

    handleEditCategory = async (event, users, categoryName) => {
        event.preventDefault();
        let userIdArr = [this.user.userId];
        let userArrays = this.validateUsernames(users, userIdArr, this.allUsers);

        if(userArrays.tempInvalidUserArr.length === 0) {
            // removes any duplicates in array
            userIdArr = [...new Set(userArrays.userIdArr)];
            if(this.OGCategoryName !== categoryName || this.isUserArrayNotEqual(userIdArr.sort())) {
                this.updateCategory(categoryName, userIdArr);
            }
        } else {
            this.setState({ 
                invalidUsers: userArrays.tempInvalidUserArr,
                editSaveBtnDisabled: true 
            });
        }
    }

    updateCategory(categoryName, userIdArr) {
        let editCategoryId = JSON.parse(localStorage.getItem('editCategoryId'));
        fetch(`${baseUrl}/update-category/${editCategoryId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                categoryName: categoryName,
                userIds: userIdArr
            })
        })
        .then(res => {
            this.handleCloseModal('.editModal');
            this.getCategories();
            this.setState({ 
                categoryName: categoryName,
                users: userIdArr,
                editSaveBtnDisabled: true,
                invalidUsers: []
            });
        })
        .catch(err => {
            console.log(err);
        })
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
                <Chores chores={this.state.chores} getChores={this.getChores} users={this.state.users}
                handleOpenModal={this.handleOpenModal} handleCloseModal={this.handleCloseModal} allUsers={this.allUsers}/>
                <AddCategoryModal addNewCategory={this.addNewCategory} handleCloseModal={this.handleCloseModal} 
                validateUsernames={this.validateUsernames} allUsers={this.allUsers}/>
                <AddChoreModal getChores={this.getChores} handleCloseModal={this.handleCloseModal} allUsers={this.allUsers}/>

                <div id="modal1" className="modal editModal modal-fixed-footer">
                    <div className="modal-content">
                        <div className='row'>
                            <i className="material-icons right"
                            onClick={() => this.handleCloseModal('.editModal')}
                            >close</i>
                        </div>

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
                                        {   this.state.invalidUsers.map(invalidUser => (
                                            invalidUser.index === index ?
                                            <p key={invalidUser.index} className="invalidUsersError">{invalidUser.errMsg}</p> :
                                            <p key={invalidUser.index}></p>
                                        ))}
                                    </div>
                                    <button type='submit' className='btn-floating col s1 red' id='removeUserInEditBtn'
                                    onClick={(e) => {this.handleRemoveUserInEdit(e, index)}}
                                    >
                                        <i className="material-icons left">remove</i>
                                    </button> 
                                </div>
                                ))
                            : 
                                <div></div>
                            }
                            
                            <div className='col s8 offset-s2'>
                                <button className='btn btn-large' onClick={(e) => {this.handleAddUserClickInEdit(e)}}>Add User</button>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn left red" 
                            onClick={() => this.handleCloseModal('.editModal')}>
                                Cancel
                        </button>

                        <a href="#!" className="btn right"
                        onClick={(e) => {this.handleEditCategory(e, this.state.users, this.state.categoryName)}}
                        disabled={this.state.editSaveBtnDisabled}>Save</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;
