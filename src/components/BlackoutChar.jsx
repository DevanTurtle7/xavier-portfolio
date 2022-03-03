/**
 * An individual character for the blackout element. Will either display the
 * character or be blacked out.
 * 
 * Props:
 *  char: The character being displayed
 *  enabled: If true, character is blacked out. Character is displayed otherwise
 *  index: This characters index in the overall string
 * 
 * @author Devan Kavalchek
 */

import { useEffect, useState } from "react"

function BlackoutChar(props) {
    const [enabled, setEnabled] = useState(false)

    /**
     * Runs after the state or props are updated
     */
    useEffect(() => {
        let index = props.index
        let enabledProp = props.enabled.has(index)

        // Check if the prop matches the state
        if (enabledProp !== enabled) {
            // Update the state to match the prop
            setEnabled(enabledProp)
        }
    }, [props.index, props.enabled, enabled])

    /**
     * Gets the class names of this character
     * 
     * @returns A string of class names
     */
    const getClassNames = () => {
        let className = props.enabled ? "blackout" : ""
        return className
    }

    return (
        <span className={getClassNames()}>{props.char}</span>
    )
}

export default BlackoutChar;