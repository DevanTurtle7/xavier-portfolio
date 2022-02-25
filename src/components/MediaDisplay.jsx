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

function MediaDisplay(props) {
    const [fadeInClass, setFadeInClass] = useState("fade-in-start");
    const [num, setNum] = useState(0)

    // Runs once, when this component is first rendered
    useEffect(() => {
        onLoad()
    }, [])

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
     * Returns an object that sleeps for a given amount of milliseconds
     * 
     * @param {*} milliseconds How long to sleep for
     * @returns A promise that can be waited on for the given amount of milliseconds
     */
    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    /**
     * Fades in this display after 1 second. Updates teh classname, which triggers a
     * CSS transition
     */
    const onLoad = async () => {
        setFadeInClass("fade-in-start")
        await sleep(1000)
        setFadeInClass("fade-in-end")
    }

    /**
     * Creates the media display(s).
     * 
     * @returns A list of media displays (ImageDisplay or VideoDisplay)
     */
    const getMediaDisplays = () => {
        let displays = []
        let data = props.data
        let content = data.content
        let tag = props.tag
        let viewable = props.viewable

        // Iterate over all the content and create a display
        for (let i = 0; i < content.length; i++) {
            let current = content[i]
            let url = current.url
            let type = current.type

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
        let centered = props.centered === true

        if (centered) {
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
        let data = props.data
        let content = data.content
        let numContent = content.length

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
        let data = props.data
        let link = data.link

        if (link !== null && link !== undefined && link !== "") {
            return (<a className='asterisk noselect' href={link} target="_blank">*</a>)
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
        let centered = props.centered === true
        let tag = props.tag

        if (tag) {
            classNames += " " + tag
        }

        if (!centered) {
            classNames += " media-display-left"
        }

        return classNames
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
                    <p>{props.description}</p>
                </div>
            </div>
        </div>
    )
}

export default MediaDisplay;