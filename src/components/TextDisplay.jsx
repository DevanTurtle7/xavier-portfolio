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

const INIT_TIME = 1000

function TextDisplay(props) {
    const [fadeInClass, setFadeInClass] = useState("fade-in-start")
    const [loaded, setLoaded] = useState(false)

    // Runs once, when this component is first rendered
    useEffect(() => {
        if (!loaded) {
            setFadeInClass("fade-in-start")

            setTimeout(() => {
                setFadeInClass("fade-in-end")
                setLoaded(true)
            }, INIT_TIME)
        }
    }, [loaded])

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