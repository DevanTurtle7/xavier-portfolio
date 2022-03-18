/**
 * The contact page of the site. Displays contact information.
 * 
 * Props:
 *  NONE
 * 
 * @author Devan Kavalchek
 */

import { Col } from 'reactstrap';
import { AiOutlineInstagram } from "react-icons/ai"
import MetaTags from 'react-meta-tags';

import IconButton from '../components/IconButton';
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react';

const BG_COLOR = "#fff"
const TEXT_COLOR = "#000"
const PAGE_TAG = "contact"

function Contact(props) {
    const [colorsUpdated, setColorsUpdated] = useState(false)

    useEffect(() => {
        if (!colorsUpdated) {
            // Set theme colors
            document.documentElement.style.setProperty('--bs-body-bg', BG_COLOR);
            document.documentElement.style.setProperty('--bs-body-color', TEXT_COLOR);
            setColorsUpdated(true)
        }
    }, [colorsUpdated])

    return (
        <Col>
            <MetaTags>
                <meta name="theme-color" content="#ffffff" />
            </MetaTags>

            <Navbar tag={PAGE_TAG} />

            <div className="contact-container">
                <Col>
                    <a className="email" href="mailto: xaviersylviajackson@gmail.com">
                        xaviersylviajackson@gmail.com
                    </a>
                </Col>
                <div className="instagram-row">
                    <a href="https://www.instagram.com/sjpencils/" target="_blank" rel="noreferrer">
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