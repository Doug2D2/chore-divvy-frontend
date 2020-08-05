import React from 'react';
import '../editCategoryModal/editCategoryModal.css';

function EditCategoryModal() {
    return(
        <div id="modal1" className="modal editModal modal-fixed-footer">
            <div className="modal-content">
                <div className='row'>
                    <div className='col s8 offset-s2'>
                        <input placeholder='Category Name' type="text" name="categoryName" id="categoryName" 
                        // value={this.state.categoryNameInput}
                        // onChange={this.handleCategoryNameChange}
                        required/>
                        <label htmlFor='categoryName'>Category Name</label>
                    </div>

                    {/* {this.state.addUserInputs.map((input, index) => (
                        <AddUserInput key={index} i={index} userInput={input} 
                        handleAddUserChange={this.handleAddUserChange}
                        handleRemoveUser={this.handleRemoveUser}/>
                    ))} */}
                    
                    <div className='col s8 offset-s2'>
                        <button className='btn btn-large' onClick={(e) => {this.handleAddUser(e)}}>Add User</button>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <a href="#!" className="modal-close waves-effect waves-green btn-flat"
                // onClick={(e) => {this.props.handleSaveCategory(e, this.state.addUserInputs, this.state.categoryNameInput)}}
                >Save</a>
            </div>
        </div>
    )
}

export default EditCategoryModal;