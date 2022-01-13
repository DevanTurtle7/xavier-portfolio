import { Component, Fragment } from 'react';
import {
    Col,
    Row,
} from 'reactstrap'
import ImageDisplay from './ImageDisplay';
import VideoDisplay from './VideoDisplay';
import CarouselControls from './CarouselControls';

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
            num: 0,
        }
    }

    onChange = (num) => {
        this.setState({
            num: num,
        })
    }

    onLoad = () => {
        this.setState({ fadeInClass: "fade-in-end" })
    }

    render() {
        let data = this.props.data
        let content = data.content
        let description = data.description
        let num = this.state.num
        let current = content[num]
        let url = current.url
        let type = current.type
        let numContent = content.length
        let media;

        if (type === "image") {
            media = (<ImageDisplay url={url} callback={this.onLoad} alt={description} />)
        } else if (type === "video") {
            media = (<VideoDisplay url={url} callback={this.onLoad} />)
        }

        let carouselControls = numContent > 1 ?
            (<CarouselControls numContent={numContent} onChange={this.onChange} />)
            : (null)

        return (
            <Fragment>
                <Row className={"justify-content-center mx-auto " + this.state.fadeInClass}>
                    <Col xs={9} md={7} lg={5} className="image-display my-4">
                        <Row className="mx-auto">
                            {media}
                        </Row>
                        {carouselControls}
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