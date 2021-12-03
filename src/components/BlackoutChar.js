import { Component } from 'react';

class BlackoutChar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            enabled: false
        }
    }

    componentDidUpdate(prevProps) {
        console.log('hi')
        let index = this.props.index
        let enabled = this.props.enabled.has(index)

        if (enabled !== this.state.enabled) {
            this.setState({enabled: enabled})
        }

    }

    render() {
        let className = this.state.enabled ? "blackout" : ""

        return (
            <span className={className}>{this.props.char}</span>
        )
    }
}

export default BlackoutChar;