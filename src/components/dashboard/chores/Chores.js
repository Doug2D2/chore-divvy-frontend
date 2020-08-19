import React, { Component } from 'react';
import '../chores/chores.css';
import M from "materialize-css";

class Chores extends Component {
    state = {
        detailsBool: false,
        currentChore: {
            assigneeId: '',
            categoryId: '',
            choreName: '',
            dateComplete: '',
            difficulty: '',
            frequencyId: '',
            id: '',
            notes: '',
            status: ''
        }
    }
    user = JSON.parse(localStorage.getItem('user'));


    handleChoreClick(event, modal, chore) {
        event.preventDefault();
        let elem = document.querySelector(modal);

        console.log(chore);

        this.setState({ currentChore: {
            assigneeId: chore.assignee_id,
            categoryId: chore.category_id,
            choreName: chore.chore_name,
            dateComplete: chore.date_complete,
            difficulty: chore.difficulty,
            frequencyId: chore.frequency_id,
            id: chore.id,
            notes: chore.notes,
            status: chore.status
            },
            detailsBool: !this.state.detailsBool
        });

        M.Modal.init(elem, {});
        let instance = M.Modal.getInstance(elem);
        instance.open();
    }

    handleChoreNameChange = (event) => {
        this.setState({ currentChore: { choreName: event.target.value }});
    }

    handleDifficultyChange = (event) => {
        let elem = document.querySelector('.difficulty');
        var instances = M.FormSelect.init(elem);
        instances.getSelectedValues();
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
                <div className='row'>
                <input placeholder='Chore Name' type="text" name="choreName" id="choreName" 
                    value={this.state.currentChore.choreName}
                    onChange={this.handleChoreNameChange}
                    required/>
                    <label htmlFor='choreName'>Chore Name</label>

                    <div className="input-field difficulty col s12">
                        <select>
                            <option value="" disabled selected>Choose your option</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                        <label>Difficulty</label>
                    </div>
                    <br />
                    <label for="cars">Choose a car:</label>
                        <select name="cars" id="cars">
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="mercedes">Mercedes</option>
                        <option value="audi">Audi</option>
                        </select> 

                </div>
            </div>
        </div>

        </div>
        )
    }

}

export default Chores;
