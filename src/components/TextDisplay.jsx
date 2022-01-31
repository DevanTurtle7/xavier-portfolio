import { Component } from 'react';

class TextDisplay extends Component {
    render() {
        let data = this.props.data
        let text = data.content
        let centered = !(this.props.centered === false)
        let darkMode = this.props.darkMode === true
        let tag = this.props.tag
        let rowClassNames = ""
        let displayClassNames = "text-display " + tag

        if (centered) {
            rowClassNames += "centered-row"
        }

        if (darkMode) {
            displayClassNames += " dark-mode"
        }

        return (
            <div className={rowClassNames}>
                <div className={displayClassNames}>
                    <p>{text}</p>
                </div>
            </div>
        )
    }
}

export default TextDisplay;