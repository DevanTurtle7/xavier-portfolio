import { Component, Fragment } from 'react';
import {
    Col,
    Row,
} from 'reactstrap'
import ImageDisplay from './ImageDisplay';
import VideoDisplay from './VideoDisplay';
import IconButton from './IconButton';
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md"

class CarouselDisplay extends Component {
    constructor(props) {
        super(props)

        let data = this.props.data
        let content = data.content
        let first = content[0]
        let url = first.url
        let type = first.type

        this.state = {
            fadeInClass: "fade-in-start",
            url: url,
            type: type,
            num: 1,
            numContent: content.length
        }
    }

    onLoad = () => {
        this.setState({ fadeInClass: "fade-in-end" })
    }

    render() {
        let data = this.props.data
        let description = data.description
        let title = data.title
        let year = data.year
        let url = this.state.url
        let type = this.state.type
        let num = this.state.num
        let numContent = this.state.numContent
        let media;

        if (type === "image") {
            media = (<ImageDisplay url={url} callback={this.onLoad} alt={description} />)
        } else if (type === "video") {
            media = (<VideoDisplay url={url} callback={this.onLoad} />)
        }

        return (
            <Fragment>
                <Row className={"justify-content-center mx-auto " + this.state.fadeInClass}>
                    <Col xs={9} md={7} lg={5} className="image-display my-4">
                        <div className="carousel-row">
                            <div className="carousel-btn-col">
                                <IconButton classNames="carousel-btn" fontSize={24}>
                                    <MdNavigateBefore />
                                </IconButton>
                            </div>
                            <Row className="mx-auto">
                            {media}
                            </Row>
                            <div className="carousel-btn-col">
                                <IconButton classNames="carousel-btn" fontSize={24}>
                                    <MdNavigateNext />
                                </IconButton>
                            </div>
                        </div>
                        <Row className="mx-auto">
                            <p className="carousel-count mb-0 mt-2">
                                {num}/{numContent}
                            </p>
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

export default CarouselDisplay;