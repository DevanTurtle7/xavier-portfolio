/**
 * A custom modal that displays children in the center of the screen.
 * 
 * Props:
 *  open: A boolean value that is true if the modal is open and false otherwise
 *  onClose: A function that runs after the modal is closed
 *  children: Any children that are wrapped inside of this component will be displayed
 *            when the modal opens.
 * 
 * @author Devan Kavalchek
 */

import { MdClose } from "react-icons/md"

import IconButton from './IconButton';

const safeDocument = typeof document !== 'undefined' ? document : {};
const html = safeDocument.documentElement;

function Modal(props) {
    const onClose = () => {
        html.style.overflow = 'visible'
        props.onClose();
    }

    const getClassNames = () => {
        let classNames = "modal-view"

        if (props.open) {
            html.style.overflow = 'hidden';
            classNames += " modal-open"
        } else {
            html.style.overflow = 'visible';
            classNames += " modal-closed"
        }

        return classNames
    }

    return (
        <div className={getClassNames()}>
            <IconButton onClick={onClose} className="modal-close-btn">
                <MdClose />
            </IconButton>

            {props.children}
        </div>
    )
}

export default Modal;