/**
 * Displays an image. Can be clicked to expand into fullscreen.
 * 
 * Props:
 *  url: The url of the image being displayed
 *  callback: A function that is called after the image has loaded
 *  alt: Text that displays if the image fails to load
 *  active: Used for carousels. True if the image is visible, false otherwise
 *  tag: A string that identifies which page this display is on
 *  viewable: True if this can be clicked to expand this display. False otherwise.
 *            True by default.
 * 
 * @author Devan Kavalchek
 */

import { Fragment, useState } from 'react';
import { Col, Row } from 'reactstrap';

import Modal from './Modal';

function ImageDisplay(props) {
    const [open, setOpen] = useState(false)

    /**
     * Runs after the image has loaded
     */
    const handleImageLoaded = () => {
        props.callback()
    }

    /**
     * Runs after the fullsreen modal has been closed
     */
    const onClose = () => {
        setOpen(false)
    }

    /**
     * Runs after the image has been clicked. Opens the fullscreen image
     */
    const onClick = () => {
        const viewable = props.viewable

        // Make viewable true if undefined (by default)
        if (props.active && (viewable === undefined || viewable)) {
            setOpen(true)
        }
    }

    /**
     * Get the class names of the image element
     * 
     * @returns A string of class names
     */
    const getImageClassNames = () => {
        const active = props.active
        const viewable = props.viewable

        let classNames = "media-element " + (active ? "active" : "inactive")

        if (viewable === undefined || viewable) {
            classNames += " clickable"
        }

        return classNames
    }

    return (
        <Fragment>
            <img
                src={props.url}
                alt={props.alt}
                onClick={onClick}
                onLoad={handleImageLoaded}
                className={getImageClassNames()}
                draggable="false"
            />

            <Modal open={open} onClose={onClose}>
                <Row className="justify-content-center align-content-center fullscreen-row">
                    <Col>
                        <img src={props.url} alt={props.alt} className="fullscreen-image" draggable="false" />
                    </Col>
                </Row>
            </Modal>
        </Fragment>
    )
}

export default ImageDisplay;