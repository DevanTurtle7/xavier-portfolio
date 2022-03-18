/**
 * The "other" page of the site. Displays media on the left hand side of the page,
 * with 2 vertical lines on the far left.
 * 
 * Props:
 *  media: An array of JSON objects that represent media on the page
 * 
 * @author Devan Kavalchek
 */

import '../style/Other.css';

import { Fragment, useEffect, useState, useCallback } from 'react';
import { Col } from 'reactstrap';
import MetaTags from 'react-meta-tags';

import Navbar from '../components/Navbar'
import MediaDisplay from '../components/MediaDisplay';
import SideLine from '../components/SideLine';
import TextDisplay from '../components/TextDisplay';

const BG_COLOR = "#000"
const TEXT_COLOR = "#fff"
const PAGE_TAG = "other"

function Other(props) {
    const [stick, setStick] = useState(false)
    const [colorsUpdated, setColorsUpdated] = useState(false)

    /**
     * Updates the side line stick after each scroll event
     */
    const onScroll = useCallback(() => {
        // Check if the scroll position is past the stick threshold
        const shouldStick = window.scrollY >= 70

        // Check if stick state needs updated
        if (shouldStick !== stick) {
            // Update stick state
            setStick(shouldStick)
        }
    }, [stick])

    useEffect(() => {
        if (!colorsUpdated) {
            // Set theme colors
            document.documentElement.style.setProperty('--bs-body-bg', BG_COLOR);
            document.documentElement.style.setProperty('--bs-body-color', TEXT_COLOR);
            setColorsUpdated(true)
        }

        window.addEventListener('scroll', onScroll)

        return () => {
            // When component is unmounted, remove the listener so that there are
            // not multiple listeners after the rerender
            window.removeEventListener('scroll', onScroll)
        }
    }, [stick, colorsUpdated, onScroll, props.media])

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
            <MetaTags>
                <meta name="theme-color" content="#000000" />
            </MetaTags>

            <Navbar />
            <Col className={PAGE_TAG}>
                <SideLine left="35px" stick={stick} />
                <SideLine left="50px" stick={stick} desktopOnly />
                {getDisplays()}
            </Col>
        </Fragment>
    )
}

export default Other;