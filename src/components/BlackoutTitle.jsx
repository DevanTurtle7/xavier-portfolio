import { Component } from 'react';

const INIT_TIME = 300;
const STEP_TIME = 100;

class Blackout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            running: false,
            enabled: new Set(),
            indexes: new Set()
        }
    }

    drawFromSet = (set) => {
        let nums = []

        for (let num of set) {
            nums.push(num)
        }

        let index = Math.floor(Math.random() * nums.length);
        let result = nums[index]
        set.delete(result)

        return result
    }

    setup = () => {
        if (!this.state.running) {
            let indexes = new Set()
            let text = this.props.text
            let textLength = text.length

            for (let i = 1; i < textLength && i + 1 < textLength; i += 2) {
                let char = text[i]

                if (char !== " ") {
                    indexes.add(i)
                }
            }

            this.setState({ indexes: indexes, running: true, enabled: new Set() })
        }
    }

    getString = () => {
        let result = this.props.text[0]

        for (let i = 1; i < this.props.text.length; i += 2) {
            let char = this.props.text[i]
            let next = this.props.text[i + 1]
            let enabled = this.state.enabled.has(i)
            let addition;

            if (enabled) {
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

    componentDidMount() {
        this.sleep(INIT_TIME).then(r => {
            this.setup()
        })
    }

    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    componentDidUpdate() {
        let indexes = this.state.indexes

        if (this.state.running) {
            if (indexes.size > 0) {
                let enabled = this.state.enabled
                let drawn = this.drawFromSet(indexes)

                enabled.add(drawn)
                this.sleep(STEP_TIME).then(r => {
                    this.setState({ enabled: enabled, indexes: indexes })
                })
            } else {
                this.setState({ running: false })
            }
        }
    }

    render() {
        return (
            <title>{this.getString()}</title>
        )
    }
}

export default Blackout;