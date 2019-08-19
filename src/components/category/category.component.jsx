import React from 'react';
import './category.styles.scss';
import ModalWrapper from '../modal-wrapper/modal-wrapper.component';

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

    render() {
        const { extensionType, description, fontAwesomeClass } = this.props;
        return (
            <li className="one_quarter">

                <article>
                    <i className={`${fontAwesomeClass} clickable`} onClick={this.handleOpenModal}></i>
                    <h6 className="heading">{extensionType}</h6>
                    <p>{description}</p>
                </article>
                <ModalWrapper showModal={this.state.showModal} handleCloseModal={() => (
                    this.setState({ showModal: false }))} />
            </li>
        )
    }


}

export default Category;