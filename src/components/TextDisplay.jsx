/**
 * A text display
 * 
 * Props:
 *  data: The JSON object of data from the database
 *  tag: A string that identifies which page this display is on
 *  centered (OPTIONAL): True if the text display is centered
 * 
 * @author Devan Kavalchek
 */

import { useEffect } from "react"
import { useState } from "react"

function TextDisplay(props) {
    const [fadeInClass, setFadeInClass] = useState("fade-in-start")

    // Runs once, when this component is first rendered
    useEffect(() => {
        onLoad()
    }, [])

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
     * Creates an asterisk if necessary
     * 
     * @returns An asterisk if this display has a link. Null otherwise.
     */
    const getAsterisk = () => {
        const data = props.data
        const link = data.link

        if (link !== null && link !== undefined && link !== "") {
            return (<a className='asterisk noselect' href={link} target="_blank">*</a>)
        } else {
            return null
        }
    }

    /**
     * Gets the font size of this text display from the database
     * 
     * @returns A string formatted for css
     */
    const getFontSize = () => {
        const data = props.data
        const size = data.size

        return size + "px"
    }

    /**
     * Gets the text to be displayed
     * 
     * @returns A string of text
     */
    const getText = () => {
        const data = props.data
        const text = data.content

        return text
    }

    /**
     * Get the classnames of the parent row div
     * 
     * @returns A string of classnames
     */
    const getRowClassNames = () => {
        if (props.centered) {
            return "centered-row"
        } else {
            return ""
        }
    }

    /**
     * Get the classnames of this text display
     * 
     * @returns A string of classnames
     */
    const getDisplayClassNames = () => {
        const tag = props.tag

        return "text-display " + tag + " " + fadeInClass
    }

    return (
        <div className={getRowClassNames()}>
            <div className={getDisplayClassNames()}>
                {getAsterisk()}
                <p style={{ fontSize: getFontSize() }}>{getText()}</p>
            </div>
        </div>
    )
}

export default TextDisplay;