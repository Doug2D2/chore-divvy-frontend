import React, { Component } from 'react';
import '../sideMenuBar/SideMenuBar.css';

function SideMenuBar(props) {
    return(
        <div className="col s3 sideMenuBar">
            <ul>
                {props.categories.map(category => (
                    <li key={category.id} id={category.id} onClick={(e) => {props.handleCategoryClick(e)}}>{category.category_name}</li>
                ))}
            </ul>
        </div>
    )
}


export default SideMenuBar;
