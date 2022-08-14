/**
 * The contact page of the site. Displays contact information.
 * 
 * Props:
 *  NONE
 * 
 * @author Devan Kavalchek
 */

import { AiOutlineInstagram } from "react-icons/ai"

import IconButton from '../shared/components/IconButton';
import Navbar from '../shared/components/Navbar'
import { useEffect, useState } from 'react';
import Footer from '../shared/components/Footer';

const BG_COLOR = "#000"
const TEXT_COLOR = "#fff"
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
        <div className="contact-root">
            <Navbar tag={PAGE_TAG} bgColor={BG_COLOR} />
            
            <div className="contact-container">
                <a className="email" href="mailto: xaviersylviajackson@gmail.com">
                    xaviersylviajackson@gmail.com
                </a>
                <div className="instagram-row">
                    <a href="https://www.instagram.com/xaeviior/" target="_blank" rel="noreferrer">
                        <IconButton className="instagram-button">
                            <AiOutlineInstagram />
                        </IconButton>
                    </a>
                </div>
            </div>
            <Footer tag={PAGE_TAG} />
        </div>
    )
}

export default Contact;