import { Component } from 'react';
import BlackoutChar from './BlackoutChar';

class Blackout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            running: true,
            enabled: new Set(),
            indexes: new Set()
        }

        let test = new Set()
        test.add(1)
        this.setState({ enabled: test })
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
        this.chars = []
        let indexes = new Set()

        for (let i = 0; i < this.props.text.length; i++) {
            let char = this.props.text[i]

            if (char != " ") {
                indexes.add(i)
            }

            this.chars.push(
                <BlackoutChar
                    char={char}
                    enabled={this.state.enabled}
                    index={i}
                    key={i}
                />
            )

            this.setState({ indexes: indexes })
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
        this.setup()
        this.setState({ running: true })
    }

    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    componentDidUpdate() {
        let indexes = this.state.indexes
        console.log(indexes)

        if (this.state.running) {
            console.log("running!")
            if (indexes.size > 0) {
                let enabled = this.state.enabled
                let drawn = this.drawFromSet(indexes)
                console.log(drawn)

                enabled.add(drawn)
                this.sleep(40).then(r => {
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
            <p className="blackout-text">{this.chars}</p>
        )
    }
}

export default Blackout;