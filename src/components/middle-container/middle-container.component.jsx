import React from 'react';

import BackGroundImage from '../../static/images/background/01.png';

const MiddleContainer = () => (
    <div className="bgded overlay" style={{ backgroundImage: `url(${BackGroundImage})` }}>
        <div id="pageintro" className="hoc clear">
            <article>
                <h3 className="heading">Universal document converter</h3>
                <p>The only converter you ever need</p>
                <footer><a className="btn" href="#">Start Converting</a></footer>
            </article>
        </div>
    </div>
);

export default MiddleContainer;