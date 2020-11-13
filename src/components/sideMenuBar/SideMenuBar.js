import React from 'react';
import '../sideMenuBar/SideMenuBar.css';

function SideMenuBar(props) {
    return(
        <div className="col s3 sideMenuBar">
            <h4 className='categoryHeader'>Categories</h4>
                <ul>
                    {props.categories.map(category => (
                        <li key={category.id} id={category.id} 
                        className={JSON.parse(localStorage.getItem('categoryId')) === category.id ? "categoryListClicked left-align" : "categoryList left-align"}
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
                        </li>
                        
                    ))}
                </ul>
            <button 
                className='btn addBtn' 
                onClick={(e) => {props.handleOpenModal(e, '.addModal')}}>
                    <i className="material-icons">add</i>
            </button>
        </div>
    )
}


export default SideMenuBar;
