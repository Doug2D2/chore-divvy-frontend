import React from 'react';
import '../sideMenuBar/SideMenuBar.css';

function SideMenuBar(props) {
    return(
        <div className="col s3 sideMenuBar">
            {/* <div className='row'> */}
                <ul>
                    {props.categories.map(category => (
                        <li key={category.id} id={category.id} className="categoryList left-align"
                        onClick={(e) => {props.handleCategoryClick(e)}}>
                            <span>
                                {category.category_name}
                            </span>
                            <span >
                                <a href='#'><i className="material-icons tiny closeCategoryIcon right">close</i></a>
                                <a href='#'><i className="material-icons tiny right editCategoryIcon">edit</i></a>
                            </span>
                        </li>
                    ))}
                </ul>
            {/* </div> */}
            <hr/>
            <button 
                className='btn btn-large' 
                onClick={(e) => {props.openAddCategoryModal(e)}}>
                    <i className="material-icons left">add</i>
                    Add Category
            </button>
        </div>
    )
}


export default SideMenuBar;
