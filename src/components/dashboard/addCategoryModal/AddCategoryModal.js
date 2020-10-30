import React, { Component } from 'react';
import AddUserInput from './addUserInput/AddUserInput';
import '../addCategoryModal/addCategoryModal.css';
import M from "materialize-css";
const validator = require("email-validator");
const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';

class AddCategoryModal extends Component {
    state = {
        addUserInputs: [],
        categoryNameInput: '',
        invalidUsers: []
    }

    handleAddUserChange = (event) => {
        let indexArr = event.target.id.split("_");
        let index = indexArr[indexArr.length - 1];
        let tempArr = this.state.addUserInputs;
        tempArr[index] = event.target.value;
        this.setState({ 
            addUserInputs: tempArr,
            invalidUsers: [] 
        });
    }

    handleRemoveUser = (event, index) => {
        event.preventDefault();
        let tempArr = this.state.addUserInputs;
        tempArr.splice(index, 1);
        this.setState({ addUserInputs: tempArr });
    }

    handleCategoryNameChange = (event) => {
        this.setState({ categoryNameInput: event.target.value})
    }

    handleSaveCategory = (event, users, categoryName) => {
        event.preventDefault();
        let isEmailAddressValid; 
        let tempInvalidUserArr = [];
        let doesUserExist;

        if(categoryName) {
            let userIdArr = [JSON.parse(localStorage.getItem('user')).userId];
            if(users.length > 0) {
                //loop through users added to new Category and all Users in db, if they match add the user's Id to userIdArr
                    for(let x = 0; x < users.length; x++) {
                        //check that username is in email format
                        doesUserExist = false;
                        isEmailAddressValid = validator.validate(users[x]);
                        if(isEmailAddressValid) {
                            for(let y = 0; y < this.props.allUsers.length; y++) {
                                if(users[x].toLowerCase() === this.props.allUsers[y].username.toLowerCase()) {
                                    userIdArr.push(this.props.allUsers[y].id);
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
                    
                    //if there are no invalid email addresses or users that don't exist in DB, continue with adding category
                    if(tempInvalidUserArr.length === 0) {
                        // removes any duplicates in array
                        userIdArr = [...new Set(userIdArr)];
                        this.props.addNewCategory(categoryName, userIdArr);
                        this.setState({ 
                            categoryNameInput: '',
                            addUserInputs: [],
                            invalidUsers: []
                        })
                    //else, prevent adding category
                    } else {
                        this.setState({ invalidUsers: tempInvalidUserArr });
                    }
            } else {
                this.props.addNewCategory(categoryName, userIdArr);
                this.setState({ 
                    categoryNameInput: '',
                    addUserInputs: [],
                    invalidUsers: []
                })
            }
        }
    }

    handleCloseAddCategoryModal(modal) {
        this.setState({
            addUserInputs: [],
            categoryNameInput: '',
            invalidUsers: []
        });

        let elem = document.querySelector(modal);
        M.Modal.init(elem, {});
        let instance = M.Modal.getInstance(elem);
        instance.close();
    }

    handleAddUser = (event) => {
        event.preventDefault()
        let tempArr = this.state.addUserInputs;
        tempArr.push("");
        this.setState({ addUserInputs: tempArr });
    }

    render() {
        return (
            <div id="modal1" className="modal addModal modal-fixed-footer">
                <div className="modal-content">
                    <div className='row'>
                        <i className="material-icons right"
                        onClick={() => this.handleCloseAddCategoryModal('.addModal')}
                        >close</i>
                    </div>
                    <div className='row'>
                        <div className='col s8 offset-s2'>
                            <input placeholder='Category Name' type="text" name="categoryName" id="categoryName" 
                            value={this.state.categoryNameInput}
                            onChange={this.handleCategoryNameChange}
                            required/>
                            <label htmlFor='categoryName'>Category Name</label>
                        </div>

                        {this.state.addUserInputs.map((input, index) => (
                            <AddUserInput key={index} i={index} userInput={input} 
                            handleAddUserChange={this.handleAddUserChange}
                            handleRemoveUser={this.handleRemoveUser}
                            invalidUsersState={this.state.invalidUsers}/>
                        ))}
                        
                        <div className='col s8 offset-s2'>
                            <button className='btn btn-large' onClick={(e) => {this.handleAddUser(e)}}>Add User</button>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn left red" 
                        onClick={() => this.handleCloseAddCategoryModal('.addModal')}>
                            Cancel
                    </button>

                    <a href="#!" className={this.state.categoryNameInput && this.state.invalidUsers.length === 0 ? "btn right" : "btn right disabled"}
                    onClick={(e) => {this.handleSaveCategory(e, this.state.addUserInputs, this.state.categoryNameInput)}}
                    >Save</a>
                </div>
            </div>
        )
    }
}

export default AddCategoryModal;
