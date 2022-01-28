import { Component } from 'react';

class SideLine extends Component {
    render() {
        let left = this.props.left
        let stick = this.props.stick
        let desktopOnly = this.props.desktopOnly

        let classNames = "side-line"

        if (desktopOnly === true) {classNames += " desktop-only"}
        if (stick) {classNames += " stick"}

        return (
            <div className={classNames} style={{ left: left }} />
        )
    }
}

export default SideLine;