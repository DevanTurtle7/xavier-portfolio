/**
 * The art page of the site
 * 
 * Props:
 *  media: An array of JSON objects that represent media on the page
 * 
 * @author Devan Kavalchek
 */

import { Fragment } from 'react';
import { Col } from 'reactstrap';
import MediaDisplay from '../components/MediaDisplay';
import Navbar from '../components/Navbar';
import MetaTags from 'react-meta-tags';
import TextDisplay from '../components/TextDisplay';

const BG_COLOR = "#fff"
const TEXT_COLOR = "#000"
const PAGE_TAG = "art"

function Art(props) {
    document.documentElement.style.setProperty('--bs-body-bg', BG_COLOR);
    document.documentElement.style.setProperty('--bs-body-color', TEXT_COLOR);

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
            key={key}
        />)
    }

    const createDisplays = () => {
        let displays = []
        let media = props.media;

        // Iterative over all the media
        for (var i = 0; i < media.length; i++) {
            let current = media[i]
            let type = current.type
            let key = current.docId + i.toString()

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

            <Navbar />
            <Col className={PAGE_TAG}>
                {createDisplays()}
            </Col>
        </Fragment>
    )
}

export default Art;