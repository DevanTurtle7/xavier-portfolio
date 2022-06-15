/**
 * The archive page of the site. Displays media on the left hand side of the page,
 * with 2 vertical lines on the far left.
 * 
 * Props:
 *  media: An array of JSON objects that represent media on the page
 * 
 * @author Devan Kavalchek
 */

import '../style/archive.css';

import { Fragment, useEffect, useState } from 'react';

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MediaDisplay from '../components/MediaDisplay';
import TextDisplay from '../components/TextDisplay';

const BG_COLOR = "#000"
const TEXT_COLOR = "#fff"
const PAGE_TAG = "archive"

function Archive(props) {
    const [colorsUpdated, setColorsUpdated] = useState(false)
    const [media, setMedia] = useState([])

    useEffect(() => {
        if (!colorsUpdated) {
            // Set theme colors
            document.documentElement.style.setProperty('--bs-body-bg', BG_COLOR);
            document.documentElement.style.setProperty('--bs-body-color', TEXT_COLOR);
            setColorsUpdated(true)
        }

        setMedia(props.media)
    }, [colorsUpdated, props.media, media])

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
            viewable={false}
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

    /**
     * Creates all of the displays on the page
     * 
     * @return A list of all of the displays
     */
    const getDisplays = () => {
        const displays = []
        const media = props.media

        // Iterate over all the media
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
            <Navbar tag={PAGE_TAG} bgColor={BG_COLOR} />
            <div id={PAGE_TAG}>
                <div id="displays">
                    {getDisplays()}
                </div>
            </div>
            <Footer tag={PAGE_TAG} />
        </Fragment>
    )
}

export default Archive;