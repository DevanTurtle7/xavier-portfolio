import { Component, Fragment, createRef } from 'react';
import {
    Col,
    Row,
} from 'reactstrap';
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
        this.setState({ open: true })
    }

    render() {
        let url = this.props.url
        let alt = this.props.alt
        let darkMode = this.props.darkMode
        let active = this.props.active
        let classNames = "clickable media-element " + (active ? "active" : "inactive")

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

                <Modal open={this.state.open} onClose={this.onClose} darkMode={darkMode}>
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