import React from 'react';

import CATEGORY_DATA from '../categories/category.data';
import Category from '../category/category.component';

class Categories extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            categories: CATEGORY_DATA
        }
    }

    render() {
        const { categories } = this.state;
        return (
            <div className="wrapper row3">
                <main className="hoc container clear">
                    <section id="introblocks">
                        <ul className="nospace group btmspace-80 elements elements-four">
                            { 
                                categories.map(({id, ...otherProps}) => (
                                    <Category key={id} {...otherProps} />
                                ))
                            }
                        </ul>
                    </section>
                </main>
            </div>
        )
    }
};

export default Categories;