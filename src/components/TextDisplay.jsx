import { Component } from 'react';

class TextDisplay extends Component {
    render() {
        let data = this.props.data
        let text = data.content

        return (
            <div>
            <p>{text}</p>
            </div>
        )
    }
}

export default TextDisplay;