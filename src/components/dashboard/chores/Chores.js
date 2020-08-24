import React, { Component } from 'react';
import '../chores/chores.css';
import M from "materialize-css";

class Chores extends Component {
    state = {
        detailsBool: false,
        choreAssignee: '',
        choreCategoryId: '',
        choreName: '',
        choreDateComplete: '',
        choreDifficulty: '',
        choreFreqId: '',
        choreId: '',
        choreNotes: '',
        choreStatus: ''
    }
    user = JSON.parse(localStorage.getItem('user'));

    handleChoreClick(event, modal, chore) {
        event.preventDefault();
        let elem = document.querySelector(modal);

        console.log(chore);

        this.setState({ 
            choreAssignee: chore.assignee_id,
            choreCategoryId: chore.category_id,
            choreName: chore.chore_name,
            choreDateComplete: chore.date_complete,
            choreDifficulty: chore.difficulty,
            choreFreqId: chore.frequency_id,
            choreId: chore.id,
            choreNotes: chore.notes,
            choreStatus: chore.status,
            detailsBool: !this.state.detailsBool
        });

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
                        defaultValue={this.state.choreName}
                        onChange={this.handleChoreNameChange}
                        required/>
                    <label htmlFor='choreName'>Chore Name</label>

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

                    <div className="input-field category">
                        <select className='browser-default'>
                            <option value="" disabled>Choose your option</option>
                        </select>
                        <div>
                            <label>Category</label>
                        </div>
                    </div>

                    <div className="input-field frequency">
                        <select className='browser-default'>
                            <option value="" disabled value>Choose your option</option>
                            <option value="Daily">Daily</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Bi-Weekly">Bi-Weekly</option>
                            <option value="Monthly">Monthly</option>
                            <option value="Quarterly">Quarterly</option>
                            <option value="Yearly">Yearly</option>
                        </select>
                        <div>
                            <label>Frequency</label>
                        </div>
                    </div>

                    <div className="input-field status">
                        <select className='browser-default'>
                            <option value="" disabled>Choose your option</option>
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                        <div>
                            <label>Status</label>
                        </div>
                    </div>

                    <textarea>
                        {/* text area for notes */}
                    </textarea>
                    <label>Notes</label>

                    <button className="btn left red"><i className="material-icons deleteChoreIcon">delete</i></button>
                    <button className="btn right">Save</button>
                        
                </div>
            </div>
        </div>

        </div>
        )
    }

}

export default Chores;
