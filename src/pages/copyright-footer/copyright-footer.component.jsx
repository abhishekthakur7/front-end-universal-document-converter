import React from 'react';

import './copyright-footer.styles.scss';

const CopyrightFooter = () => (
    <div className="wrapper row5">
        <div id="copyright" className="hoc clear"> 
            <div className="social-buttons">
                <a href="https://www.facebook.com/CodeMyUI" className="social-button facebook">
                    <i className="fa fa-facebook"></i>
                </a>
                <a href="https://twitter.com/Saijo_George" className="social-button twitter">
                    <i className="fa fa-twitter"></i>
                </a>  
                <a href="https://plus.google.com/114315889997029739149" className="social-button google">
                    <i className="fa fa-google"></i>
                </a>
            </div>
           </div>
        </div>
    );

export default CopyrightFooter;