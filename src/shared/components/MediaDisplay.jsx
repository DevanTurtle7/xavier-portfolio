/**
 * Display a piece of media with a description. Could be an image or a video
 * 
 * Props:
 *  data: The JSON object of data from the database
 *  tag: A string that identifies which page this display is on
 *  viewable: True if this can be clicked to expand this display. False otherwise
 *  centered: True if this display is horizontally centered
 * 
 * @author Devan Kavalchek
 */

import { useEffect, useState } from 'react';

import ImageDisplay from './ImageDisplay';
import VideoDisplay from './VideoDisplay';
import CarouselControls from './CarouselControls';

const LOAD_DELAY = 1000
const MAX_LOAD_TIME = 10000

function MediaDisplay(props) {
    const [fadeInClass, setFadeInClass] = useState("fade-in-start");
    const [num, setNum] = useState(0)
    const [loaded, setLoaded] = useState(false)

    // Runs once, when this component is first rendered
    useEffect(() => {
        let timeout

        // Fade in animation
        // Finish is here because after fade-in-class is 
        if (loaded) {
            setFadeInClass("fade-in-start")

            timeout = setTimeout(() => {
                setFadeInClass("fade-in-end")
            }, LOAD_DELAY)
        }

        // Force fade in after 10 seconds (incase an event was missed)
        if (!loaded) {
            timeout = setTimeout(() => {
                onLoad()
            }, MAX_LOAD_TIME)
        }

        return () => clearTimeout(timeout)
    }, [loaded])

    /**
     * A callback for carousel controls. Updates which image is the one that is currently
     * displayed in the carousel.
     * 
     * @param {*} num  The index of the new currently display image (0 to n-1)
     */
    const onChange = (num) => {
        setNum(num)
    }

    /**
     * Starts the loading animation
     */
    const onLoad = () => {
        setLoaded(true)
    }

    /**
     * Creates the media display(s).
     * 
     * @returns A list of media displays (ImageDisplay or VideoDisplay)
     */
    const getMediaDisplays = () => {
        const displays = []
        const data = props.data
        const content = data.content
        const tag = props.tag
        const viewable = props.viewable

        // Iterate over all the content and create a display
        for (let i = 0; i < content.length; i++) {
            const current = content[i]
            const url = current.url
            const type = current.type

            if (type === "image") {
                displays.push(<ImageDisplay
                    url={url}
                    callback={onLoad}
                    alt={props.description}
                    active={num === i}
                    tag={tag}
                    viewable={viewable}
                    key={i}
                />)
            } else if (type === "video") {
                displays.push(<VideoDisplay url={url} callback={onLoad} key={i} />)
            }
        }

        return displays
    }

    /**
     * Get the classnames of the parent row div
     * 
     * @returns A string of classnames
     */
    const getRowClassNames = () => {
        let classNames = fadeInClass

        if (props.centered) {
            classNames += " centered-row"
        }

        return classNames
    }

    /**
     * Creates carousel controls if they are necessary
     * 
     * @returns CarouselControls if there are multiple pieces of media. Null otherwise.
     */
    const getCarouselControls = () => {
        const data = props.data
        const content = data.content
        const numContent = content.length

        if (numContent > 1) {
            return (<CarouselControls numContent={numContent} onChange={onChange} />)
        } else {
            return null
        }
    }

    /**
     * Creates an asterisk if necessary
     * 
     * @returns An asterisk if this display has a link. Null otherwise.
     */
    const getAsterisk = () => {
        const data = props.data
        const link = data.link

        if (link !== null && link !== undefined && link !== "") {
            return (<a className='asterisk noselect' href={link} target="_blank" rel="noreferrer">*</a>)
        } else {
            return null
        }
    }

    /**
     * Get the classnames of the media display
     * 
     * @returns A string of classnames
     */
    const getMediaDisplayClassNames = () => {
        let classNames = "media-display"
        const tag = props.tag

        if (tag) {
            classNames += " " + tag
        }

        if (!props.centered) {
            classNames += " media-display-left"
        }

        return classNames
    }

    /**
     * Gets this image's description
     * 
     * @returns A string of the description of this image
     */
    const getDescription = () => {
        const data = props.data
        const description = data.description

        return description
    }

    return (
        <div className={getRowClassNames()}>
            <div className={getMediaDisplayClassNames()}>
                <div className="media-container">
                    {getAsterisk()}
                    {getMediaDisplays()}
                </div>
                {getCarouselControls()}
                <div className="image-description">
                    <p>{getDescription()}</p>
                </div>
            </div>
        </div>
    )
}

export default MediaDisplay;