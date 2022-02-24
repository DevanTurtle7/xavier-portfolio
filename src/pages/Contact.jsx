/**
 * The contact page of the site. Displays contact information.
 * 
 * Props:
 *  NONE
 * 
 * @author Devan Kavalchek
 */

import { Col } from 'reactstrap';
import IconButton from '../components/IconButton';
import Navbar from '../components/Navbar'
import { AiOutlineInstagram } from "react-icons/ai"
import MetaTags from 'react-meta-tags';

const BG_COLOR = "#fff"
const TEXT_COLOR = "#000"

function Contact(props) {
    // Set theme colors
    document.documentElement.style.setProperty('--bs-body-bg', BG_COLOR);
    document.documentElement.style.setProperty('--bs-body-color', TEXT_COLOR);

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
                    <a href="https://www.instagram.com/sjpencils/" target="_blank">
                        <IconButton className="instagram-button">
                            <AiOutlineInstagram />
                        </IconButton>
                    </a>
                </div>
            </div>
        </Col>
    )
}

export default Contact;