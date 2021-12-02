import { Component } from 'react';

class IconButton extends Component {
    onClick = () => {
        this.props.onClick()
    }

    render() {
        let classNames = this.props.className + " icon-btn";

        return (
            <button onClick={this.onClick} className={classNames}>
                {this.props.children}
            </button>
        )
    }
}

export default IconButton;