import { Component } from 'react';
import IconButton from './IconButton';
import { MdClose } from "react-icons/md"

class Modal extends Component {
    render() {
        let classNames = "modal-view"
        classNames += this.props.open ? " modal-open" : " modal-closed"

        return (
            <div className={classNames}>
                <IconButton onClick={this.props.onClose} className="modal-close-btn">
                    <MdClose />
                </IconButton>

                {this.props.children}
            </div>
        )
    }
}

export default Modal;