import React from 'react';
import '../addUserInput/addUserInput.css';

function AddUserInput(props) {
    return (
        <div className='col s8 offset-s2' id='addUserDiv'>
            <input placeholder="User's Name" type="text" name="usersName" id={`userName_${props.i}`} 
            value={props.userInput}
            onChange={props.handleAddUserChange}
            required/>
            <label htmlFor='usersName'>User's Name</label>
        </div>
    )
}

export default AddUserInput;