import React from 'react';

import './middle-container.styles.scss';

const MiddleContainer = () => (
    <div className="bgded overlay">
        <div id="pageintro" className="hoc clear">
            <article>
                <h3 className="mainHeading">Universal document converter</h3>
                <p>The only converter you ever need</p>
                <footer><a href='#files' className='button'><span>START CONVERTING</span></a></footer>
            </article>
        </div>
    </div>
);

export default MiddleContainer;