import React from 'react';
import '../addUserInput/addUserInput.css';

function AddUserInput(props) {
    return (
        <div className='row'>
            <div className='col s7 offset-s2' id='addUserDiv'>
                <input placeholder="Username" type="text" name="userName" id={`userName_${props.i}`} 
                value={props.userInput}
                onChange={props.handleAddUserChange}
                />
                <label htmlFor='userName'>Username</label>
            </div>
            <button type='submit' className='btn-floating col s1 red' id='removeUserBtn'
            onClick={(e) => {props.handleRemoveUser(e, props.i)}}>
                <i className="material-icons left">remove</i>
            </button>
        </div>
    )
}

export default AddUserInput;