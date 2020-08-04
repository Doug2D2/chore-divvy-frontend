import React from 'react';
import '../sideMenuBar/SideMenuBar.css';

function SideMenuBar(props) {
    return(
        <div className="col s3 sideMenuBar">
                <ul>
                    {props.categories.map(category => (
                        <li key={category.id} id={category.id} className="categoryList left-align"
                        onClick={(e) => {props.handleCategoryClick(e)}}>
                                {category.category_name}
                            <span >
                                <a href='#'>
                                    <i className="material-icons closeCategoryIcon right"
                                    onClick={(e) => {props.handleDeleteCategory(e, category.id)}}>
                                        close
                                    </i>
                                </a>
                                <a href='#'>
                                    <i className="material-icons right editCategoryIcon"
                                    onClick={(e) => {props.handleEditCategory(e, category.id)}}>
                                        edit
                                    </i>
                                </a>
                            </span>
                            <hr className='categoryHrTag'></hr>
                        </li>
                        
                    ))}
                </ul>
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
