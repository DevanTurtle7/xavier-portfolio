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
    const [enabled, setEnabled] = useState(new Set())
    const [indexes, setIndexes] = useState(new Set())
    const [hasSetUp, setHasSetUp] = useState(false)
    const [beingHandled, setBeingHandled] = useState(false)

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
     * Sets up for the start of the animation. Initializes/resets any variables
     */
    const setup = () => {
        if (!running) {
            const newIndexes = new Set()
            const text = props.text
            const textLength = text.length

            // Add every index to the set
            for (let i = 1; i < textLength; i++) {
                const char = text[i]

                if (char !== " ") {
                    newIndexes.add(i)
                }
            }

            // Initialize states
            setIndexes(newIndexes)
            setRunning(true)
            setEnabled(new Set())
            setHasSetUp(true)
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
            let char = text[i]

            // Create and add a character
            chars.push(
                <BlackoutChar
                    char={char}
                    enabled={enabled}
                    index={i}
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
        // Set up for the start of the animation if it hasn't already
        if (!hasSetUp) {
            sleep(INIT_TIME).then(r => {
                setup()
            })
        }

        // Check if everything is running and ready
        if (running && hasSetUp) {
            // Check that this state is not already being handled
            if (!beingHandled) {
                setBeingHandled(true)

                if (indexes.size > 0) {
                    const drawn = drawFromSet(indexes)

                    // Wait, then draw a new index. State will update and useEffect() will be called again
                    sleep(STEP_TIME).then(r => {
                        setEnabled(prev => new Set(prev.add(drawn)))
                        setIndexes(prev => new Set([...prev].filter(x => x !== drawn)))
                        setBeingHandled(false)
                    })
                } else {
                    // Animation has completed
                    setRunning(false)
                    setBeingHandled(false)
                }
            }
        }
    }, [beingHandled, running, hasSetUp])

    return (
        <p className="blackout-text clickable noselect mb-0" onClick={setup}>
            {getBlackoutCharacters()}
        </p>
    )
}

export default Blackout;