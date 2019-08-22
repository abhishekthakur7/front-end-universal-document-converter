import React from 'react';
import './category.styles.scss';
import ModalWrapper from '../modal-wrapper/modal-wrapper.component';
import CustomButton from '../custom-button/custom-button.component';
import Upload from '../upload/upload.component';

class Category extends React.Component {

    constructor() {
        super();
        this.state = {
            showModal: false
        };
    }

    handleOpenModal = () => (
        this.setState({ showModal: true })
    )

    handleCloseModal = () => (
        this.setState({ showModal: false }))

    render() {
        const { extensionType, description, fontAwesomeClass } = this.props;
        return (
            <li className="one_quarter">

                <article>
                    <i className={`${fontAwesomeClass} clickable`} onClick={this.handleOpenModal}></i>
                    <h6 className="heading">{extensionType}</h6>
                    <p>{description}</p>
                </article>
                <ModalWrapper showModal={this.state.showModal}  handleCloseModal = {this.handleCloseModal}>
                    <div>
                        <CustomButton onClick={this.handleCloseModal} className="closeButton">Close</CustomButton>
                    </div>
                    <div className="Card">
                        <Upload />
                    </div>
                </ModalWrapper>
            </li>
                )
            }
        
        
        }
        
export default Category;