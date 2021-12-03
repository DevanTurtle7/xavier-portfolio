import { Component, Fragment } from 'react';
import {
    Col,
    Row,
    Container
} from 'reactstrap';
import Modal from './Modal';

class ImageDisplay extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false
        }
    }

    onClose = () => {
        this.setState({ open: false })
    }

    onClick = () => {
        this.setState({ open: true })
    }

    render() {
        const image = require(`../images/${this.props.image}`).default

        return (
            <Fragment>
                <Row className="justify-content-center mx-auto">
                    <Col xs={9} md={7} lg={5} className="image-display my-4">
                        <Row className="mx-auto">
                            <img
                                src={image}
                                alt={this.props.description}
                                onClick={this.onClick}
                                className="clickable"
                            />
                        </Row>
                        <Row className="mx-auto">
                            <p className="image-description mb-0 mt-2">
                                {this.props.label}, {this.props.year}
                            </p>
                        </Row>
                        <Row className="image-description mx-auto">
                            <p>{this.props.description}</p>
                        </Row>
                    </Col>
                </Row>

                <Modal open={this.state.open} onClose={this.onClose}>
                    <Row className="justify-content-center align-content-center fullscreen-row">
                        <Col>
                                <img src={image} alt={this.props.description} className="fullscreen-image" />
                        </Col>
                    </Row>
                </Modal>
            </Fragment>
        )
    }
}

export default ImageDisplay;