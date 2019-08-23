import React from 'react';

class ContactUs extends React.Component {

    state = {
        name: '',
        email: ''
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div className="wrapper row2">
                <section id="ctdetails" className="hoc container clear">
                    <div className="sectiontitle">
                        <p className="nospace font-xs">Enim eleifend dignissim bibendum</p>
                        <h6 className="heading font-x2">Id tristique id metus nulla</h6>
                    </div>
                    <figure className="one_half first">
                        <ul className="nospace clear">
                            <li className="block clear"><a href="1"><i className="fas fa-phone"></i></a> <span><strong>Give us a call:</strong> +91 (980) 583 1007 </span></li>
                            <li className="block clear"><a href="2"><i className="fas fa-envelope"></i></a> <span><strong>Send us a mail:</strong> abhishekthakurbir@gmail.com </span></li>
                            <li className="block clear"><a href="https://www.google.com/maps/place/Capgemini+Knowledge+Park/@19.1561072,72.9818065,13.63z/data=!4m5!3m4!1s0x3be7b9795b2d4a9b:0xee35d75e8490a585!8m2!3d19.1788347!4d72.9903638"><i className="fas fa-map-marker-alt"></i></a> <span><strong>Come visit us:</strong> Directions to <a href="https://www.google.com/maps/place/Capgemini+Knowledge+Park/@19.1561072,72.9818065,13.63z/data=!4m5!3m4!1s0x3be7b9795b2d4a9b:0xee35d75e8490a585!8m2!3d19.1788347!4d72.9903638">our location</a></span></li>
                        </ul>
                    </figure>
                    <article className="one_half">
                        <h6 className="heading">Want us to contact you ?</h6>
                        <p className="nospace btmspace-15">Add your name and email address. We will contact you.</p>
                        <form action="#" method="post">
                            <fieldset>
                                <legend>Newsletter:</legend>
                                <input name="name" type="text" onChange={this.handleChange} placeholder="Name" />
                                <input name="email" type="email" onChange={this.handleChange} placeholder="Email" />
                                <button type="submit" value="submit">Submit</button>
                            </fieldset>
                        </form>
                    </article>
                </section>
            </div>
        )
    }
}

export default ContactUs;