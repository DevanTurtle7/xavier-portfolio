import { Component } from 'react';
import {
    Col,
    Row
} from 'reactstrap';
import IconButton from './IconButton';
import { MdClose } from "react-icons/md"
import MenuLink from './MenuLink';

class Modal extends Component {
    render() {
        let classNames = "menu"
        classNames += this.props.open ? " menu-open" : " menu-closed"

        return (
            <div className={classNames}>
                <IconButton onClick={this.props.onClose} className="menu-close-btn">
                    <MdClose />
                </IconButton>

                {this.props.children}
            </div>
        )
    }
}

export default Modal;