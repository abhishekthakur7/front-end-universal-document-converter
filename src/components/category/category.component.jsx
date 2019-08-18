import React from 'react';
import { Link } from 'react-router-dom';

const Category = ({ extensionType, description, fontAwesomeClass }) => (
    <li className="one_quarter">
        
        <article>
            <Link to="/">
                <i className={fontAwesomeClass}></i>
            </Link>
            <h6 className="heading">{ extensionType }</h6>
            <p>{ description }</p>
        </article>
        
    </li>
);

export default Category;