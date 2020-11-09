import React, { Component } from 'react';
import M from "materialize-css";
import swal from 'sweetalert';
const validator = require("email-validator");
const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';

class addChoreModal extends Component{
    state = {
        choreAssigneeUsername: '',
        choreName: '',
        choreDateComplete: '',
        choreDifficulty: '',
        choreFreqId: '',
        choreNotes: '',
        choreStatus: '',
        userErrMsg: ''   
    }
    user = JSON.parse(localStorage.getItem('user'));
    frequencies = [];
    usersCategories = [];

    componentDidMount() {
        this.getFrequencies();
        this.getUsersCategories();
    }

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value});
    }

    handleAddStatus = event => {
        if(event.target.value === "Completed") {
            this.setState({ 
                choreStatus: event.target.value,
                choreDateComplete: new Date()
            })
        } else {
            this.setState({ choreStatus: event.target.value });
        }
    }

    handleAddAssigneeUsername = event => {
        this.setState({ 
            choreAssigneeUsername: event.target.value,
            userErrMsg: ''
         });
    }

    getFrequencies() {
        fetch(`${baseUrl}/get-frequencies`)
        .then(res => res.json())
        .then(frequencies => {
            this.frequencies = frequencies;
        })
        .catch(err => {
            console.log(err);
        })
    }

    getUsersCategories() {
        fetch(`${baseUrl}/get-categories-by-userId/${this.user.userId}`)
        .then(res => res.json())
        .then(currentUsersCategories => {
            this.usersCategories = currentUsersCategories;
        })
        .catch(err => {
            console.log(err);
        })
    }

    addChore(choreName, choreStatus, choreCategoryId, choreDateComplete, choreFreqId, choreAssigneeUsername, choreDifficulty, choreNotes) {
        if(choreName && choreStatus && choreCategoryId) {
            fetch(`${baseUrl}/add-chore`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    choreName: choreName,
                    status: choreStatus,
                    dateComplete: choreDateComplete,
                    frequencyId: choreFreqId,
                    categoryId: choreCategoryId,
                    assigneeId: choreAssigneeUsername,
                    difficulty: choreDifficulty,
                    notes: choreNotes
                })
            })
            .then(res => res.json())
            .then(newChoreData => {
                this.props.handleCloseModal('.addChoreModal');
                this.props.getChores();
                this.setState({
                    choreAssigneeUsername: '',
                    choreName: '',
                    choreDateComplete: '',
                    choreDifficulty: '',
                    choreFreqId: '',
                    choreNotes: '',
                    choreStatus: '',
                    userErrMsg: ''
                });
            })
            .catch(err => {
                swal({ icon: 'error', text: 'Unable to add chore'});
            });
        }
    }

    handleAddChore(event, choreName, choreStatus, choreAssigneeUsername, choreDateComplete, choreFreqId, choreCategoryId, choreDifficulty, choreNotes) {
        event.preventDefault();
        let assigneeId = null;
        let doesUserExist = false;
        let errMsg;

        if(!choreAssigneeUsername) {
            choreAssigneeUsername = null;
        }
        if(!choreFreqId) {
            choreFreqId = null;
        }
        if(!choreDifficulty) {
            choreDifficulty = null;
        } 
        if(!choreDateComplete) {
            choreDateComplete = null;
        }

        if(choreAssigneeUsername) {
            let isEmailAddressValid = validator.validate(choreAssigneeUsername);
            if(isEmailAddressValid) {
                for(let x = 0; x < this.props.allUsers.length; x++) {
                    if(this.props.allUsers[x].username.toLowerCase() === choreAssigneeUsername.toLowerCase()) {
                        assigneeId = this.props.allUsers[x].id;
                        doesUserExist = true;
                        break;
                    }
                }
                if(!doesUserExist) {
                    errMsg = 'User Does Not Exist';
                } 
            } else {
                errMsg = 'Invalid Username Format';
            }
            
            if(doesUserExist && isEmailAddressValid) {
                this.addChore(choreName, choreStatus, choreCategoryId, choreDateComplete, choreFreqId, 
                    assigneeId, choreDifficulty, choreNotes); ;
            } else {
                this.setState({ userErrMsg: errMsg });
            }
        } else {
            this.addChore(choreName, choreStatus, choreCategoryId, choreDateComplete, choreFreqId, 
                assigneeId, choreDifficulty, choreNotes); 
        }



    }

    handleCloseAddChoreModal(modal) {
        this.setState({
            choreAssigneeUsername: '',
            choreName: '',
            choreDateComplete: '',
            choreDifficulty: '',
            choreFreqId: '',
            choreNotes: '',
            choreStatus: ''   
        });

        let elem = document.querySelector(modal);
        M.Modal.init(elem, {});
        let instance = M.Modal.getInstance(elem);
        instance.close();
    }

    render() {
        return (
            <div id="modal1" className="modal addChoreModal modal-fixed-footer">
                <div className="modal-content">

                    <i className="material-icons right"
                    onClick={() => this.handleCloseAddChoreModal('.addChoreModal')}
                    >close</i>

                    <div className='row addChoreForm'>
                    <input placeholder='Chore Name' type="text" name="choreName" id="choreName" 
                            value={this.state.choreName}
                            onChange={this.handleInputChange}
                            required/>
                        <label htmlFor='choreName'>Chore Name (Required)</label>
                    </div>

                    <div className="input-field status">
                        <select className='browser-default' value={this.state.choreStatus} onChange={this.handleAddStatus}>
                            <option value="" disabled>Choose your option</option>
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                        <div>
                            <label>Status (Required)</label>
                        </div>
                    </div>

                    <input placeholder="Assigned To (User's Email)" type='text' name='choreAssignee' id='choreAssignee'
                            value={this.state.choreAssigneeUsername}
                            onChange={this.handleAddAssigneeUsername}
                        />
                    <label htmlFor='choreAssignee'>Assigned To (User's Email)</label>
                    { this.state.userErrMsg ? <p className="invalidUsersError">{this.state.userErrMsg}</p> : <p></p> }

                    <div className="input-field frequency">
                        <select className='browser-default' value={this.state.choreFreqId} onChange={this.handleInputChange} name='choreFreqId'>
                            <option value="" disabled>Choose your option</option>
                            {this.frequencies.map(freq => (
                                <option key={freq.id} value={freq.id}>{freq.frequency_name}</option>
                            ))}
                        </select>
                        <div>
                            <label>Frequency</label>
                        </div>
                    </div>

                    <div className="input-field category">
                        <select className='browser-default' value={this.props.addChoreCategoryId} onChange={this.props.handleInputChange} name='addChoreCategoryId'>
                            <option value="" disabled>Choose your option</option>
                            {this.usersCategories.map(category => (
                                <option key={category.id} value={category.id}>{category.category_name}</option>
                            ))}
                        </select>
                        <div>
                            <label>Category (Required)</label>
                        </div>
                    </div>

                    <div className="input-field difficulty">
                        <select className='browser-default' value={this.state.choreDifficulty} onChange={this.handleInputChange} name='choreDifficulty'>
                            <option value="" disabled>Choose your option</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                        <div>
                            <label>Difficulty</label>
                        </div>
                    </div>

                    <textarea value={this.state.choreNotes} onChange={this.handleInputChange} name='choreNotes'></textarea>
                    <label>Notes</label>

                    <button className="btn left red" 
                        onClick={() => this.handleCloseAddChoreModal('.addChoreModal')}>
                            Cancel
                    </button>

                    <button className={this.state.choreName && this.state.choreStatus && this.props.addChoreCategoryId && !this.state.userErrMsg
                    ? 'btn right' : 'btn right disabled'}
                        onClick={(e) => {this.handleAddChore(e, this.state.choreName, this.state.choreStatus, 
                        this.state.choreAssigneeUsername, this.state.choreDateComplete, this.state.choreFreqId, this.props.addChoreCategoryId,
                        this.state.choreDifficulty, this.state.choreNotes)}}>
                        Save
                    </button>

                </div>
            </div>
        )
    }
}

export default addChoreModal;
