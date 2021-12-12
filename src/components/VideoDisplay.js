import { Component, Fragment } from 'react';
import {
    Col,
    Row,
} from 'reactstrap';

class VideoDisplay extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fadeInClass: "fade-in-start"
        }
    }

    onLoad = () => {
        this.setState({fadeInClass: "fade-in-end"})
    }

    render() {
        let data = this.props.data
        let url = data.url
        let medium = data.medium
        let title = data.title
        let year = data.year

        return (
            <Fragment>
                <Row className={"justify-content-center mx-auto " + this.state.fadeInClass}>
                    <Col xs={9} md={7} lg={5} className="image-display my-4">
                        <Row className="mx-auto">
                            <video controls onLoadedData={this.onLoad}>
                                <source src={url}/>
                            </video>
                        </Row>
                        <Row className="mx-auto">
                            <p className="image-description mb-0 mt-2">
                                {title}, {year}
                            </p>
                        </Row>
                        <Row className="image-description mx-auto">
                            <p>{medium}</p>
                        </Row>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}

export default VideoDisplay;