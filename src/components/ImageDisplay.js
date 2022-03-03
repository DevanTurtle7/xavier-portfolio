import { Fragment, useState } from 'react';
import { Col, Row } from 'reactstrap';

import Modal from './Modal';

function ImageDisplay(props) {
    const [open, setOpen] = useState(false)

    const handleImageLoaded = () => {
        props.callback()
    }

    const onClose = () => {
        setOpen(false)
    }

    const onClick = () => {
        let viewable = props.viewable

        if (props.active && (viewable === undefined || viewable)) {
            setOpen(true)
        }
    }

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