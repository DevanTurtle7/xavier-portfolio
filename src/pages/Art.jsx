/**
 * The art page of the site. Contains centered art images with descriptions.
 * 
 * Props:
 *  media: An array of JSON objects that represent media on the page
 * 
 * @author Devan Kavalchek
 */

import { Fragment, useEffect, useState } from 'react';
import { Col } from 'reactstrap';
import MetaTags from 'react-meta-tags';

import MediaDisplay from '../components/MediaDisplay';
import Navbar from '../components/Navbar';
import TextDisplay from '../components/TextDisplay';
import Footer from '../components/Footer';

const BG_COLOR = "#fff"
const TEXT_COLOR = "#000"
const PAGE_TAG = "art"

function Art(props) {
    const [colorsUpdated, setColorsUpdated] = useState(false)

    useEffect(() => {
        if (!colorsUpdated) {
            // Set theme colors
            document.documentElement.style.setProperty('--bs-body-bg', BG_COLOR);
            document.documentElement.style.setProperty('--bs-body-color', TEXT_COLOR);
            setColorsUpdated(true)
        }
    }, [colorsUpdated])

    /**
     * Creates a media display
     * 
     * @param {*} data The JSON object of the document
     * @param {*} key A unique identifier used by React
     * @returns A MediaDisplay
     */
    const createMediaDisplay = (data, key) => {
        return (<MediaDisplay
            data={data}
            tag={PAGE_TAG}
            viewable={true}
            centered
            key={key}
        />)
    }

    /**
     * Creates a text display
     * 
     * @param {*} data The JSON object of the document
     * @param {*} key A unique identifier used by React
     * @returns A TextDisplay
     */
    const createTextDisplay = (data, key) => {
        return (<TextDisplay
            data={data}
            tag={PAGE_TAG}
            centered
            key={key}
        />)
    }

    /**
     * Creates all of the displays on the page
     * 
     * @returns A list of all of the displays
     */
    const getDisplays = () => {
        const displays = []
        const media = props.media;

        // Iterative over all the media
        for (let i = 0; i < media.length; i++) {
            const current = media[i]
            const type = current.type
            const key = current.docId + i.toString()

            // Create a display
            if (type === "media") {
                displays.push(createMediaDisplay(current, key))
            } else if (type === "text") {
                displays.push(createTextDisplay(current, key))
            }
        }

        // Return all displays
        return displays
    }

    return (
        <Fragment>
            <MetaTags>
                <meta name="theme-color" content={BG_COLOR} />
            </MetaTags>

            <Navbar tag={PAGE_TAG} />
            <Col className={PAGE_TAG}>
                {getDisplays()}
            </Col>
            <Footer tag={PAGE_TAG} />
        </Fragment>
    )
}

export default Art;