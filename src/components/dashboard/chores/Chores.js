import React, { Component } from 'react';
import '../chores/chores.css';

class Chores extends Component {
    state = {
        detailsBool: false
    }

    user = JSON.parse(localStorage.getItem('user'));

    handleChoreClick(event, chore) {
        event.preventDefault();

        console.log(chore);
        this.setState({ detailsBool: !this.state.detailsBool });
    }

    render() {
        return (
            <div className="choreList col s5 offset-s2">
            <ul>
                {this.props.chores.map(chore => (
                    <li key={chore.id} onClick={(e) => this.handleChoreClick(e, chore)}>
                        <span>{chore.chore_name}</span>
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

                    </li>
                ))}
            </ul>
        </div>
        )
    }

}

export default Chores;