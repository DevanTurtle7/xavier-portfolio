import { Component, Fragment } from 'react';
import {
    Col,
    Row,
} from 'reactstrap'
import ImageDisplay from '../components/ImageDisplay';
import VideoDisplay from '../components/VideoDisplay';;

class MediaDisplay extends Component {
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
        let type = this.props.type.toLowerCase()
        let data = this.props.data
        let url = data.url
        let description = data.description
        let title = data.title
        let year = data.year
        let media;

        if (type === "image") {
            media = (<ImageDisplay url={url} callback={this.onLoad} alt={description}/>)
        } else if (type === "video") {
            media = (<VideoDisplay url={url} callback={this.onLoad}/>)
        } else {
            media = (<div>Invalid media display type</div>)
        }

        return (
            <Fragment>
                <Row className={"justify-content-center mx-auto " + this.state.fadeInClass}>
                    <Col xs={9} md={7} lg={5} className="image-display my-4">
                        <Row className="mx-auto">
                            {media}
                        </Row>
                        <Row className="mx-auto">
                            <p className="image-description mb-0 mt-2">
                                {title}, {year}
                            </p>
                        </Row>
                        <Row className="image-description mx-auto">
                            <p>{description}</p>
                        </Row>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}

export default MediaDisplay;