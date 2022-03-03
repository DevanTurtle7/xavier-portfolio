import { useEffect } from "react";
import { useState } from "react";

const INIT_TIME = 300;
const STEP_TIME = 80;

function BlackoutTitle(props) {
    const [running, setRunning] = useState(false)
    const [enabled, setEnabled] = useState(new Set())
    const [indexes, setIndexes] = useState(new Set())
    const [hasSetUp, setHasSetUp] = useState(false)
    const [beingHandled, setBeingHandled] = useState(false)

    const drawFromSet = (set) => {
        const nums = []

        for (let num of set) {
            nums.push(num)
        }

        const index = Math.floor(Math.random() * nums.length);
        const result = nums[index]

        return result
    }

    const setup = () => {
        if (!running) {
            const newIndexes = new Set()
            const text = props.text
            const textLength = text.length

            for (let i = 1; i < textLength && i + 1 < textLength; i += 2) {
                const char = text[i]

                if (char !== " ") {
                    newIndexes.add(i)
                }
            }

            console.log(newIndexes.size)

            setIndexes(newIndexes)
            setRunning(true)
            setEnabled(new Set())
        }
    }

    const getString = () => {
        let result = props.text[0]

        for (let i = 1; i < props.text.length; i += 2) {
            const char = props.text[i]
            const next = props.text[i + 1]
            const isEnabled = enabled.has(i)
            let addition;

            if (isEnabled) {
                if (char === " ") {
                    addition = " █"
                } else if (next === " ") {
                    addition = "█ "
                } else {
                    addition = "█"
                }
            } else {
                addition = char.concat(next)
            }

            result = result.concat(addition)
        }

        return result;
    }

    useEffect(() => {
        if (!hasSetUp) {
            setHasSetUp(true)
            sleep(INIT_TIME).then(r => {
                setup()
            })
        }

        if (running && hasSetUp) {
            if (!beingHandled) {
                console.log('handingling')
                setBeingHandled(true)

                if (indexes.size > 0) {
                    const drawn = drawFromSet(indexes)

                    sleep(STEP_TIME).then(r => {
                        setEnabled(prev => new Set(prev.add(drawn)))
                        setIndexes(prev => new Set([...prev].filter(x => x !== drawn)))
                        setBeingHandled(false)
                    })
                } else {
                    setRunning(false)
                    setBeingHandled(false)
                }
            }
        }
    }, [beingHandled, running, hasSetUp])

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    document.title = getString()
    return (null)
}

export default BlackoutTitle;