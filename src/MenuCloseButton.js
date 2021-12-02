import { Component } from 'react';
import {
    Button
} from 'reactstrap';
import { MdClose } from "react-icons/md"

class MenuCloseButton extends Component {
    onClick = () => {
        this.props.onClick()
    }

    render() {
        return (
            <button onClick={this.onClick} i className="menu-close-btn">
                <MdClose />
            </button>
        )
    }
}

export default MenuCloseButton;