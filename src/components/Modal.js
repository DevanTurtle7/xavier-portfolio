import { Component } from 'react';
import IconButton from './IconButton';
import { MdClose } from "react-icons/md"

const safeDocument = typeof document !== 'undefined' ? document : {};
const html = safeDocument.documentElement;

class Modal extends Component {
    onClose = () => {
        html.style.overflow = 'visible'
        this.props.onClose();
    }

    render() {
        let classNames = "modal-view"
        let darkMode = this.props.darkMode === true

        if (this.props.open) {
            html.style.overflow = 'hidden';
            classNames += " modal-open"
        } else {
            html.style.overflow = 'visible';
            classNames += " modal-closed"
        }

        if (darkMode) {
            classNames += " dark-mode"
        }

        return (
            <div className={classNames}>
                <IconButton onClick={this.onClose} className="modal-close-btn" darkMode={darkMode}>
                    <MdClose />
                </IconButton>

                {this.props.children}
            </div>
        )
    }
}

export default Modal;