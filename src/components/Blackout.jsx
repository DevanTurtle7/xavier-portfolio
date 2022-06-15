/**
 * A text element that individually blacks out each character (except spaces and the first character)
 * 
 * Props:
 *  text: The text displayed
 * 
 * @author Devan Kavalchek
 */

import { useEffect, useState } from 'react';

import BlackoutChar from './BlackoutChar';

const INIT_TIME = 300;
const STEP_TIME = 40;

function Blackout(props) {
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
     * Restarts the animation if it is not currently running
     */
    const rerun = () => {
        if (!running) {
            setHasSetUp(false)
        }
    }

    /**
     * Creates all of the individual blackout characters
     * 
     * @returns A list of character elements
     */
    const getBlackoutCharacters = () => {
        const chars = []
        const text = props.text
        const textLength = text.length

        // Iterate over all of the characters
        for (let i = 0; i < textLength; i++) {
            const char = text[i]
            const enabled = (i !== 0 && !indexes.has(i))

            // Create and add a character
            chars.push(
                <BlackoutChar
                    char={char}
                    enabled={enabled}
                    key={i}
                />
            )
        }

        return chars
    }

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

                // Add every index to the set
                for (let i = 1; i < textLength; i++) {
                    newIndexes.add(i)
                }

                // Initialize states
                setIndexes(newIndexes)
                setRunning(true)
                setHasSetUp(true)
            }, INIT_TIME)
        }

        // Run a iteration of the animation
        if (running && hasSetUp) {
            if (indexes.size > 0) {
                // Enable a new random character
                timeout = setTimeout(() => {
                    const drawn = drawFromSet(indexes)
                    setIndexes(prev => new Set([...prev].filter(x => x !== drawn)))
                }, STEP_TIME)
            } else {
                // All characters have been added
                setRunning(false)
            }
        }

        return () => { clearTimeout(timeout) }
    }, [running, hasSetUp, indexes, props.text])

    return (
        <p className="blackout-text clickable noselect mb-0" onClick={rerun}>
            {getBlackoutCharacters()}
        </p>
    )
}

export default Blackout;