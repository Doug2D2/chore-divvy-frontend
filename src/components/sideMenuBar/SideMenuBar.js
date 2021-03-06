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
                                    <i className="material-icons closeCategoryIcon right"
                                    onClick={(e) => {props.handleDeleteCategory(e, category.id)}}>
                                        close
                                    </i>
                                    <i className="material-icons right editCategoryIcon"
                                    onClick={(e) => {props.handleOpenModal(e, '.editModal', category)}}>
                                        edit
                                    </i>
                            </span>
                            <hr className='categoryHrTag'></hr>
                        </li>
                        
                    ))}
                </ul>
            <button 
                className='btn ' 
                onClick={(e) => {props.handleOpenModal(e, '.addModal')}}>
                    <i className="material-icons">add</i>
            </button>
        </div>
    )
}


export default SideMenuBar;
