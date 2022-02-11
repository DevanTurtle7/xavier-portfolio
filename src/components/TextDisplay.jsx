import { Component } from 'react';

class TextDisplay extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fadeInClass: "fade-in-start"
        }
    }

    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    onLoad = async () => {
        this.setState({ fadeInClass: "fade-in-start" })
        await this.sleep(1000)
        this.setState({ fadeInClass: "fade-in-end" })
    }

    componentDidMount() {
        this.onLoad()
    }

    render() {
        let data = this.props.data
        let text = data.content
        let size = data.size
        let centered = !(this.props.centered === false)
        let tag = this.props.tag
        let rowClassNames = ""
        let fadeInClass = this.state.fadeInClass
        let displayClassNames = "text-display " + tag + " " + fadeInClass

        if (centered) {
            rowClassNames += "centered-row"
        }

        return (
            <div className={rowClassNames}>
                <div className={displayClassNames}>
                    <p style={{fontSize: size + "px"}}>{text}</p>
                </div>
            </div>
        )
    }
}

export default TextDisplay;