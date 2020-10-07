import React, { Component } from 'react';
const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';

class addChoreModal extends Component{

    render() {
        return (
            <div id="modal1" className="modal addChoreModal modal-fixed-footer">
                <div className="modal-content">
                    <div className='row'>
                        <h1>addChoreModal</h1>
                    </div>
                </div>
            </div>
        )
    }
}

export default addChoreModal;