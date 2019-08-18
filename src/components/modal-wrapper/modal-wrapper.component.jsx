import React from 'react';
import './modal-wrapper.styles.scss';

import CustomButton from '../custom-button/custom-button.component';
import UploadFileWrapper from '../upload-file/upload-file.component';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

const ModalWrapper = ({ showModal, handleCloseModal }) => (
    <ReactModal 
           isOpen={ showModal }
           contentLabel="onRequestClose"
           onRequestClose={ handleCloseModal }
           className="Modal"
           overlayClassName="Overlay"
        >
        <CustomButton onClick={ handleCloseModal } className="closeButton">Close</CustomButton>
        <UploadFileWrapper />
    </ReactModal>
);

export default ModalWrapper;