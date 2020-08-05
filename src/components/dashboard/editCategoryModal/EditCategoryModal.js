import React, { Component } from 'react';
import '../editCategoryModal/editCategoryModal.css';

class EditCategoryModal extends Component {
    state = {
        categoryNameEdit: ''
    }

    handleCategoryNameEdit = (event) => {
        this.setState({ categoryNameEdit: event.target.value})
    }

    handleEditUser = (event) => {
        event.preventDefault();
        this.setState({ categoryNameEdit: '' })
    }

    render() {
        return(
            <div id="modal1" className="modal editModal modal-fixed-footer">
                <div className="modal-content">
                    <div className='row'>
                        <div className='col s8 offset-s2'>
                            <input placeholder={this.props.categoryToBeEdited.category_name} type="text" name="categoryName" id="categoryName" 
                            value={this.state.categoryNameEdit}
                            onChange={this.handleCategoryNameEdit}
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
}

export default EditCategoryModal;