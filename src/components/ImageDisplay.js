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
            loaded: false,
            fadeInClass: "fade-in-start"
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
        this.setState({ loaded: true, fadeInClass: 'fade-in-end' })
    }

    onClose = () => {
        this.setState({ open: false })
    }

    onClick = () => {
        this.setState({ open: true })
    }

    render() {
        return (
            <Fragment>
                <Row className={"justify-content-center mx-auto " + this.state.fadeInClass}>
                    <Col xs={9} md={7} lg={5} className="image-display my-4">
                        <Row className="mx-auto">
                            <img
                                src={this.props.url}
                                ref={this.image}
                                alt={this.props.medium}
                                onClick={this.onClick}
                                onLoad={this.handleImageLoaded}
                                className="clickable"
                            />
                        </Row>
                        <Row className="mx-auto">
                            <p className="image-description mb-0 mt-2">
                                {this.props.title}, {this.props.year}
                            </p>
                        </Row>
                        <Row className="image-description mx-auto">
                            <p>{this.props.medium}</p>
                        </Row>
                    </Col>
                </Row>

                <Modal open={this.state.open} onClose={this.onClose}>
                    <Row className="justify-content-center align-content-center fullscreen-row">
                        <Col>
                            <img src={this.props.url} alt={this.props.description} className="fullscreen-image" />
                        </Col>
                    </Row>
                </Modal>
            </Fragment>
        )

    }
}

export default ImageDisplay;