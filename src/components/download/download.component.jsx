import React from 'react';
import './download.styles.scss';

const Download = () => (
    <div className='download'>
        <span className="Title">Download Converted File</span>
        <div id="wrapper">
            <div className="center"><a href="javascript:void(0)" class="dlbtn">Download<span className="details">.zip<span className="size">11.5 MB</span></span></a></div>
        </div>
    </div>
);

export default Download;