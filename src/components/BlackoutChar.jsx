/**
 * An individual character for the blackout element. Will either display the
 * character or be blacked out.
 * 
 * Props:
 *  char: The character being displayed
 *  enabled: If true, character is blacked out. Character is displayed otherwise
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
        let enabledProp = props.enabled

        // Check if the prop matches the state
        if (enabledProp !== enabled) {
            // Update the state to match the prop
            setEnabled(enabledProp)
        }
    }, [props.enabled, enabled])

    /**
     * Gets the class names of this character
     * 
     * @returns A string of class names
     */
    const getClassNames = () => {
        let className = enabled ? "blackout" : ""
        return className
    }

    return (
        <span className={getClassNames()}>{props.char}</span>
    )
}

export default BlackoutChar;