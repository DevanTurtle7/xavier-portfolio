import { Component } from 'react';

class IconButton extends Component {
    onClick = () => {
        this.props.onClick()
    }

    render() {
        let classProp = this.props.className
        let classNames = classProp === undefined ? "" : classProp
        classNames += " icon-btn"

        let fontSize = this.props.fontSize === undefined ? '20px' : this.props.fontSize.toString() + "px"

        return (
            <button onClick={this.onClick} className={classNames} style={{'fontSize': fontSize}}>
                {this.props.children}
            </button>
        )
    }
}

export default IconButton;