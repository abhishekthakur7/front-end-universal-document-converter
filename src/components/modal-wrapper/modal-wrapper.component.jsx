import React from 'react';
import './modal-wrapper.styles.scss';

import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

const ModalWrapper = ({ showModal, handleCloseModal, children }) => (
    <ReactModal 
           isOpen={ showModal }
           contentLabel="onRequestClose"
           onRequestClose={ handleCloseModal }
           className="Modal"
           overlayClassName="Overlay"
        >
        {children}
    </ReactModal>
);

export default ModalWrapper;