import { Component } from 'react';

class SideLine extends Component {
    render() {
        let left = this.props.left
        let classNames = "side-line"

        if (this.props.desktopOnly === true) {
            classNames += " desktop-only"
        }


        return (
            <div className={classNames} style={{ left: left }} />
        )
    }
}

export default SideLine;