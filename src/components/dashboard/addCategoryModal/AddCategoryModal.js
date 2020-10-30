import React, { Component } from 'react';
import AddUserInput from './addUserInput/AddUserInput';
import '../addCategoryModal/addCategoryModal.css';
import M from "materialize-css";
const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';

class AddCategoryModal extends Component {
    state = {
        addUserInputs: [],
        categoryNameInput: ''
    }

    handleAddUserChange = (event) => {
        let indexArr = event.target.id.split("_");
        let index = indexArr[indexArr.length - 1];
        let tempArr = this.state.addUserInputs;
        tempArr[index] = event.target.value;
        this.setState({ addUserInputs: tempArr });
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
        const emailFormatRegEx = /\S+@\S+/;
        let isEmailAddressValid; 
        let invalidEmailIndeces = [];
        let nonexistentUserIndeces = [];

        if(categoryName) {
            let userIdArr = [JSON.parse(localStorage.getItem('user')).userId];
            if(users.length > 0) {
                //loop through users added to new Category and all Users in db, if they match add the user's Id to userIdArr
                    for(let x = 0; x < users.length; x++) {
                        //check that username is in email format
                        isEmailAddressValid = emailFormatRegEx.test(users[x]);
                        if(isEmailAddressValid) {
                            for(let y = 0; y < this.props.allUsers.length; y++) {
                                if(users[x].toLowerCase() === this.props.allUsers[y].username.toLowerCase()) {
                                    userIdArr.push(this.props.allUsers[y].id);
                                } else {
                                    nonexistentUserIndeces.push(x);
                                }
                            }
                        } else {
                            invalidEmailIndeces.push(x);
                        }
                    }
                    
                    // removes any duplicates in array
                    userIdArr = [...new Set(userIdArr)];
                    this.props.addNewCategory(categoryName, userIdArr);
                    this.setState({ 
                        categoryNameInput: '',
                        addUserInputs: []
                    })
            } else {
                this.props.addNewCategory(categoryName, userIdArr);
                this.setState({ 
                    categoryNameInput: '',
                    addUserInputs: []
                })
            }
        }
    }

    handleCloseAddCategoryModal(modal) {
        this.setState({
            addUserInputs: [],
            categoryNameInput: ''
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
                            handleRemoveUser={this.handleRemoveUser}/>
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

                    <a href="#!" className="modal-close waves-effect waves-green btn-flat"
                    onClick={(e) => {this.handleSaveCategory(e, this.state.addUserInputs, this.state.categoryNameInput)}}
                    >Save</a>
                </div>
            </div>
        )
    }
}

export default AddCategoryModal;
