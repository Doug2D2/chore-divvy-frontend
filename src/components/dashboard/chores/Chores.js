import React, { Component } from 'react';
import '../chores/chores.css';
import M from "materialize-css";
import ChoreModal from './choreModal/ChoreModal';

class Chores extends Component {
    state = {
        detailsBool: false
    }
    user = JSON.parse(localStorage.getItem('user'));


    handleChoreClick(event, modal, chore) {
        event.preventDefault();
        //Open chore detail/edit modal
        let elem = document.querySelector(modal);
        M.Modal.init(elem, {});
        let instance = M.Modal.getInstance(elem);

        instance.open();

        console.log(chore);
        this.setState({ detailsBool: !this.state.detailsBool });
        

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
            
            <ChoreModal />

        </div>
        )
    }

}

export default Chores;

                        {/* <div className="choreDiv">
                            <span>{chore.chore_name}</span>
                            {this.state.detailsBool ?
                                <span>
                                    <hr className="choreDetailsHr"/>
                                    <span><i className="material-icons right">close</i></span>
                                    <br/>
                                    <p>Status: {chore.status}</p>
                                    <p>Difficulty: {chore.difficulty}</p>
                                    <i className="material-icons">edit</i>
                                    <i className="material-icons">delete</i>
                                </span>
                            :
                                <div></div>
                            }
                        </div> */}