/**
 * Animates the HTML page title
 * 
 * Props:
 *  text: The text displayed
 * 
 * @author Devan Kavalchek
 */

import { useCallback, useEffect, useState } from "react";

const INIT_TIME = 1500;
const STEP_TIME = 80;
const X_CHAR = "x"

function BlackoutTitle(props) {
    const [running, setRunning] = useState(false)
    const [indexes, setIndexes] = useState(new Set())
    const [hasSetUp, setHasSetUp] = useState(false)

    /**
     * Gets a random item from a set
     * 
     * @param {*} set The set being drawn from
     * @returns The item that was drawn
     */
    const drawFromSet = (set) => {
        // Convert set to an array
        const nums = []

        for (let num of set) {
            nums.push(num)
        }

        // Get a random item from the array
        const index = Math.floor(Math.random() * nums.length);
        const result = nums[index]

        return result
    }

    /**
     * Gets the current title
     * 
     * @returns A string of the page title
     */
    const getString = useCallback(() => {
        let result = props.text[0]

        /**
         * Iterate over every other index
         */
        for (let i = 1; i < props.text.length; i++) {
            const char = props.text[i]
            const enabled = !indexes.has(i)
            result = result.concat(enabled ? X_CHAR : char);
        }

        return result;
    }, [props.text, indexes])

    /**
     * Runs everytime the state is updated
     */
    useEffect(() => {
        let timeout;

        // Set up for the start of the animation if it hasn't already
        if (!running && !hasSetUp) {
            timeout = setTimeout(() => {
                const newIndexes = new Set()
                const text = props.text
                const textLength = text.length

                // Add every other index to the set
                for (let i = 1; i < textLength && i + 1 < textLength; i++) {
                    newIndexes.add(i)
                }

                // Initialize states
                setIndexes(newIndexes)
                setRunning(true)
                setHasSetUp(true)
            }, INIT_TIME)
        }

        // Check if everything is running and ready
        if (running && hasSetUp) {
            // Check that this state is not already being handled
            if (indexes.size > 0) {
                timeout = setTimeout(() => {

                    const drawn = drawFromSet(indexes)
                    setIndexes(prev => new Set([...prev].filter(x => x !== drawn)))
                }, STEP_TIME)
            } else {
                // Animation has completed
                setRunning(false)
            }
        }

        // Update the title after the state has updated
        return () => {
            document.title = getString()
            clearTimeout(timeout)
        }
    }, [running, hasSetUp, indexes, props.text, getString])

    // Don't return any HTML
    return null
}

export default BlackoutTitle;