import { Component } from 'react';
import { Col } from 'reactstrap';
import IconButton from '../components/IconButton';
import Navbar from '../components/Navbar'
import { AiOutlineInstagram } from "react-icons/ai"

class Contact extends Component {
    openInstagram = () => {
        window.open("https://www.instagram.com/sjpencils/", "_blank")
    }

    render() {
        return (
            <Col>
                <Navbar />

                <div className="contact-container">
                    <Col>
                        <a className="email" href="mailto: xaviersylviajackson@gmail.com">
                            xaviersylviajackson@gmail.com
                        </a>
                    </Col>
                    <div className="instagram-row">
                        <IconButton className="instagram-button" onClick={this.openInstagram}>
                            <AiOutlineInstagram stroke="black"/>
                        </IconButton>
                    </div>
                </div>
            </Col>
        )
    }
}

export default Contact;