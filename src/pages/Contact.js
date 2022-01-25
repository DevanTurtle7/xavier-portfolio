import '../style/LightStyle.css';
import { Component } from 'react';
import { Col } from 'reactstrap';
import IconButton from '../components/IconButton';
import Navbar from '../components/Navbar'
import { AiOutlineInstagram } from "react-icons/ai"
import MetaTags from 'react-meta-tags';

class Contact extends Component {
    openInstagram = () => {
        window.open("https://www.instagram.com/sjpencils/", "_blank")
    }

    render() {
        document.body.style.backgroundColor = "white"

        return (
            <Col>
                <MetaTags>
                    <meta name="theme-color" content="#ffffff" />
                </MetaTags>

                <Navbar />

                <div className="contact-container">
                    <Col>
                        <a className="email" href="mailto: xaviersylviajackson@gmail.com">
                            xaviersylviajackson@gmail.com
                        </a>
                    </Col>
                    <div className="instagram-row">
                        <IconButton className="instagram-button" onClick={this.openInstagram}>
                            <AiOutlineInstagram />
                        </IconButton>
                    </div>
                </div>
            </Col>
        )
    }
}

export default Contact;