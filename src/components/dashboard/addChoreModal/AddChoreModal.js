import React, { Component } from 'react';
const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';

class addChoreModal extends Component{
    state = {
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
    frequencies = [];
    usersCategories = [];

    componentDidMount() {
        this.getFrequencies();
        this.getUsersCategories();
    }

    handleAddChoreName = event => {
        this.setState({ choreName: event.target.value });
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
        this.setState({ choreAssigneeUsername: event.target.value });
    }

    handleAddFrequency = event => {
        this.setState({ choreFreqId: event.target.value });
    }

    handleAddCategory = event => {
        this.setState({ choreCategoryId: event.target.value });
    }

    handleAddDifficulty = event => {
        this.setState({ choreDifficulty: event.target.value });
    }

    handleAddNote = event => {
        this.setState({ choreNotes: event.target.value });
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

    handleAddChore(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div id="modal1" className="modal addChoreModal modal-fixed-footer">
                <div className="modal-content">

                    <div className='row addChoreForm'>
                    <input placeholder='Chore Name' type="text" name="choreName" id="choreName" 
                            value={this.state.choreName}
                            onChange={this.handleAddChoreName}
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

                    <div className="input-field frequency">
                        <select className='browser-default' value={this.state.choreFreqId} onChange={this.handleAddFrequency}>
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
                        <select className='browser-default' value={this.state.choreCategoryId} onChange={this.handleAddCategory}>
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
                        <select className='browser-default' value={this.state.choreDifficulty} onChange={this.handleAddDifficulty}>
                            <option value="" disabled>Choose your option</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                        <div>
                            <label>Difficulty</label>
                        </div>
                    </div>

                    <textarea value={this.state.choreNotes} onChange={this.handleAddNote}></textarea>
                    <label>Notes</label>

                    <button className={this.state.choreName && this.state.choreStatus && this.state.choreCategoryId ? 'btn right' : 'btn right disabled'}
                        onClick={this.handleAddChore}
                    >
                        Save
                    </button>

                </div>
            </div>
        )
    }
}

export default addChoreModal;