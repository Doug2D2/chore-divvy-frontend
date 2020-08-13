import React, { Component } from 'react';

class Chores extends Component {

    render() {
        return (
            <div className="col s8">
            <ul>
                {this.props.chores.map(chore => (
                    <li key={chore.id}>{chore.chore_name}</li>
                ))}
            </ul>
        </div>
        )
    }

}

export default Chores;