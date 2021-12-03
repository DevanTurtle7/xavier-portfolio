import { Component } from 'react';
import BlackoutChar from './BlackoutChar';

const INIT_TIME = 1000;
const STEP_TIME = 40;

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
            this.chars = []
            let indexes = new Set()

            for (let i = 0; i < this.props.text.length; i++) {
                let char = this.props.text[i]

                if (char !== " " && i !== 0) {
                    indexes.add(i)
                }
            }

            this.setState({ indexes: indexes, running: true, enabled: new Set() })
        }
    }

    renderChars = () => {
        this.chars = []

        for (let i = 0; i < this.props.text.length; i++) {
            let char = this.props.text[i]

            this.chars.push(
                <BlackoutChar
                    char={char}
                    enabled={this.state.enabled}
                    index={i}
                    key={i}
                />
            )
        }
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
        this.renderChars()

        return (
            <p className="blackout-text noselect" onClick={this.setup}>{this.chars}</p>
        )
    }
}

export default Blackout;