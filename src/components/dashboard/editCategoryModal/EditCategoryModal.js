// import React, { Component } from 'react';
// import '../editCategoryModal/editCategoryModal.css';

// class EditCategoryModal extends Component {
//     state = {
//         categoryNameEdit: '',
//         userNameEditArr: []
//     }

//     handleCategoryNameEdit = (event) => {
//         this.setState({ categoryNameEdit: event.target.value})
//     }

//     handleEditUser = (event) => {
//         event.preventDefault();
//         this.setState({ categoryNameEdit: '' })
//     }

    // render() {
    //     return(
            // <div id="modal1" className="modal editModal modal-fixed-footer">
            //     <div className="modal-content">
            //         <div className='row'>
            //             <div className='col s8 offset-s2'>
            //                 <input type="text" name="categoryName" id="categoryName" 
            //                 value={this.state.categoryNameEdit}
            //                 onChange={this.handleCategoryNameEdit}
            //                 required/>
            //                 <label htmlFor='categoryName'>Category Name</label>
            //             </div>

            //             {/* {this.props.categoryToBeEditedId.username 
            //             ? 
            //                 this.props.categoryToBeEdited.username.map((username, index) => (
            //                     <div className='row' key={index}>
            //                      <div className='col s7 offset-s2' id='editUserInputDiv'>
            //                         <input placeholder={username} type="text" name="userName" id={`userName_${index}`} 
            //                         // value={props.userInput}
            //                         // onChange={props.handleAddUserChange}
            //                         />
            //                         <label htmlFor='userName'>Username</label>
            //                     </div>
            //                     <button type='submit' className='btn-floating col s1 red' id='removeUserBtn'
            //                     // onClick={(e) => {props.handleRemoveUser(e, props.i)}}
            //                     >
            //                         <i className="material-icons left">remove</i>
            //                     </button> 
            //                 </div>
            //                 ))
            //             : 
            //                 <div></div>
            //             } */}
    
            //             {/* {this.state.addUserInputs.map((input, index) => (
            //                 <AddUserInput key={index} i={index} userInput={input} 
            //                 handleAddUserChange={this.handleAddUserChange}
            //                 handleRemoveUser={this.handleRemoveUser}/>
            //             ))} */}
                        
            //             <div className='col s8 offset-s2'>
            //                 <button className='btn btn-large' onClick={(e) => {this.handleAddUser(e)}}>Add User</button>
            //             </div>
            //         </div>
            //     </div>
            //     <div className="modal-footer">
            //         <a href="#!" className="modal-close waves-effect waves-green btn-flat"
            //         // onClick={(e) => {this.props.handleSaveCategory(e, this.state.addUserInputs, this.state.categoryNameInput)}}
            //         >Save</a>
            //     </div>
            // </div>
        // )
//     }
// }

// export default EditCategoryModal;