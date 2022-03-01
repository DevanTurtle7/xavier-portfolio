import { Component, Fragment, createRef } from 'react';
import { Col, Row } from 'reactstrap';

import Modal from './Modal';

class ImageDisplay extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
        }

        this.handleImageLoaded = this.handleImageLoaded.bind(this)
        this.image = createRef();
    }

    componentDidMount() {
        const img = this.image.current

        if (img && img.complete) {
            this.handleImageLoaded()
        }
    }

    handleImageLoaded = () => {
        this.props.callback()
    }

    onClose = () => {
        this.setState({ open: false })
    }

    onClick = () => {
        let viewable = this.props.viewable

        if (this.props.active && (viewable === undefined || viewable)) {
            this.setState({ open: true })
        }
    }

    render() {
        let url = this.props.url
        let alt = this.props.alt
        let active = this.props.active
        let viewable = this.props.viewable
        let classNames = "media-element " + (active ? "active" : "inactive")

        if (viewable === undefined || viewable) {
            classNames += " clickable"
        }

        return (
            <Fragment>
                <img
                    src={url}
                    ref={this.image}
                    alt={alt}
                    onClick={this.onClick}
                    onLoad={this.handleImageLoaded}
                    className={classNames}
                    draggable="false"
                />

                <Modal open={this.state.open} onClose={this.onClose}>
                    <Row className="justify-content-center align-content-center fullscreen-row">
                        <Col>
                            <img src={url} alt={alt} className="fullscreen-image" draggable="false" />
                        </Col>
                    </Row>
                </Modal>
            </Fragment>
        )
    }
}

export default ImageDisplay;