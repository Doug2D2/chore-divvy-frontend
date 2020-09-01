import React, { Component } from 'react';
import '../chores/chores.css';
import M from "materialize-css";
const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';

class Chores extends Component {
    state = {
        detailsBool: false,
        choreAssigneeUsername: '',
        choreCategoryId: '',
        choreName: '',
        choreDateComplete: '',
        choreDifficulty: '',
        choreFreqId: '',
        choreNotes: '',
        choreStatus: ''
    }
    user = JSON.parse(localStorage.getItem('user'));
    usersCategories = [];
    frequencies = [];
    currentChore = {};

    componentDidMount() {
        this.getUsersCategories();
        this.getFrequencies();
        M.AutoInit();
    }

    handleChoreClick(event, modal, chore) {
        event.preventDefault();
        let elem = document.querySelector(modal);
        this.getUserById(chore.assignee_id);
        this.currentChore = chore; 

        if(!chore.notes) {
            this.setState({ 
                choreCategoryId: chore.category_id,
                choreName: chore.chore_name,
                choreDateComplete: chore.date_complete,
                choreDifficulty: chore.difficulty,
                choreFreqId: chore.frequency_id,
                choreNotes: '',
                choreStatus: chore.status,
                detailsBool: !this.state.detailsBool
            });
        } else {
            this.setState({ 
                choreCategoryId: chore.category_id,
                choreName: chore.chore_name,
                choreDateComplete: chore.date_complete,
                choreDifficulty: chore.difficulty,
                choreFreqId: chore.frequency_id,
                choreNotes: chore.notes,
                choreStatus: chore.status,
                detailsBool: !this.state.detailsBool
            });
        }

        M.Modal.init(elem, {});
        let instance = M.Modal.getInstance(elem);
        instance.open();
    }

    handleChoreNameChange = (event) => {
        this.setState({ choreName: event.target.value });
    }

    handleDifficultyChange = (event) => {
        this.setState({ choreDifficulty: event.target.value });
    }

    handleCategoryChange = (event) => {
        this.setState({ choreCategoryId: event.target.value });
    }

    handleFrequencyChange = (event) => {
        this.setState({ choreFreqId: event.target.value });
    }

    handleStatusChange = (event) => {
        if(event.target.value === "Completed") {
            this.setState({ 
                choreStatus: event.target.value,
                choreDateComplete: new Date()
            })
        }
        this.setState({ choreStatus: event.target.value });
    }

    handleNoteChange = (event) => {
        this.setState({ choreNotes: event.target.value });
    }

    handleAssigneeChange = (event) => {
        this.setState({ choreAssigneeUsername: event.target.value });
    }

    handleSaveEditChore() {
        console.log('save');
    }
    
    handleDeleteChore(event, modal, id, getChores) {
        event.preventDefault();
        let elem = document.querySelector(modal);
        fetch(`${baseUrl}/delete-chore/${id}`, {
            method: 'DELETE'
        })
        .then(res => {
            getChores();
        })
        .catch(err => {
            console.log(err);
        });
        
        M.Modal.init(elem, {});
        let instance = M.Modal.getInstance(elem);
        instance.close();
    }

    getUsersCategories() {
        fetch(`${baseUrl}/get-categories-by-userId/${this.user.userId}`)
        .then(res => {
            return res.json();
        })
        .then(currentUsersCategories => {
            this.usersCategories = currentUsersCategories;
        })
        .catch(err => {
            console.log(err);
        })
    }

    getFrequencies() {
        fetch(`${baseUrl}/get-frequencies`)
        .then(res => {
            return res.json();
        })
        .then(frequencies => {
            this.frequencies = frequencies;
        })
        .catch(err => {
            console.log(err);
        })
    }

    getUserById(assigneeId) {
        fetch(`${baseUrl}/get-user/${assigneeId}`)
        .then(res => {
            return res.json();
        })
        .then(user => {
            this.setState({ choreAssigneeUsername: user[0].username });
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <div className="choreList col s5 offset-s2">
            <ul>
                {this.props.chores.map(chore => (
                    <li key={chore.id} onClick={(e) => this.handleChoreClick(e, '.choreModal', chore)}>
                        <span>{chore.chore_name}</span>
                    </li>
                ))}
            </ul>
            
            <div id="modal1" className="modal choreModal modal-fixed-footer">
            <div className="modal-content">
                <div className='row choreEditForm'>

                    <input placeholder='Chore Name' type="text" name="choreName" id="choreName" 
                        value={this.state.choreName}
                        onChange={this.handleChoreNameChange}
                        required/>
                    <label htmlFor='choreName'>Chore Name</label>

                    <div className="input-field status">
                        <select className='browser-default' value={this.state.choreStatus} onChange={this.handleStatusChange}>
                            <option value="" disabled>Choose your option</option>
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                        <div>
                            <label>Status</label>
                        </div>
                    </div>

                    <input placeholder="Assigned To (User's Email)" type='text' name='choreAssignee' id='choreAssignee'
                        value={this.state.choreAssigneeUsername}
                        onChange={this.handleAssigneeChange}
                    />

                    <div className="input-field frequency">
                        <select className='browser-default' value={this.state.choreFreqId} onChange={this.handleFrequencyChange}>
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
                        <select className='browser-default' value={this.state.choreCategoryId} onChange={this.handleCategoryChange}>
                            <option value="" disabled>Choose your option</option>
                            {this.usersCategories.map(category => (
                                <option key={category.id} value={category.id}>{category.category_name}</option>
                            ))}
                        </select>
                        <div>
                            <label>Category</label>
                        </div>
                    </div>

                    <div className="input-field difficulty">
                        <select className='browser-default' value={this.state.choreDifficulty} onChange={this.handleDifficultyChange}>
                            <option value="" disabled>Choose your option</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                        <div>
                            <label>Difficulty</label>
                        </div>
                    </div>

                    <textarea value={this.state.choreNotes} onChange={this.handleNoteChange}></textarea>
                    <label>Notes</label>

                    <button className="btn left red" 
                        onClick={(e) => this.handleDeleteChore(e, '.choreModal', this.currentChore.id, this.props.getChores)}>
                            <i className="material-icons deleteChoreIcon">delete</i>
                    </button>

                    <button className="btn right" 
                        onClick={this.handleSaveEditChore}>
                            Save
                    </button>  

                    {/* <ChoreModalButtons 
                        currentChore={this.currentChore}
                        choreAssigneeUsername={this.state.choreAssigneeUsername}
                        choreCategoryId={this.state.choreCategoryId}
                        choreName={this.state.choreName}
                        choreDateComplete={this.state.choreDateComplete}
                        choreDifficulty={this.state.choreDifficulty}
                        choreFreqId={this.state.choreFreqId}
                        choreNotes={this.state.choreNotes}
                        choreStatus={this.state.choreStatus}
                    /> */}

                </div>
            </div>
        </div>

        </div>
        )
    }

}

export default Chores;
