import React from 'react';

import MiddleContainer from '../../components/middle-container/middle-container.component';
import Categories from '../../components/categories/categories.component';

const HomePage = () => (
    <div style = {{'background': 'linear-gradient(to right, #f08a5d, #f9ed69)'}}>
        <MiddleContainer />
        <Categories />
    </div> 
);

export default HomePage;