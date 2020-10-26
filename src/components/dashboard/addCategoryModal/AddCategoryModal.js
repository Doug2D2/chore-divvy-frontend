import React, { Component } from 'react';
import AddUserInput from './addUserInput/AddUserInput';
import '../addCategoryModal/addCategoryModal.css';
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
        if(categoryName) {
            let userIdArr = [JSON.parse(localStorage.getItem('user')).userId];
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
                    // removes any duplicates in array
                    userIdArr = [...new Set(userIdArr)];
                    this.props.addNewCategory(categoryName, userIdArr);
                    this.setState({ 
                        categoryNameInput: '',
                        addUserInputs: []
                    })
                })
                .catch(err => {
                    console.log(err);
                });
            } else {
                this.props.addNewCategory(categoryName, userIdArr);
                this.setState({ 
                    categoryNameInput: '',
                    addUserInputs: []
                })
            }
        }
    }

    render() {
        return (
            <div id="modal1" className="modal addModal modal-fixed-footer">
                <div className="modal-content">
                    <div className='row'>
                        <i className="material-icons right"
                        onClick={() => this.props.handleCloseModal('.addModal')}
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
                        onClick={() => this.props.handleCloseModal('.addModal')}>
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
