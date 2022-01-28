import { Component, Fragment } from 'react';
import {
    Col,
    Row,
} from 'reactstrap'
import ImageDisplay from './ImageDisplay';
import VideoDisplay from './VideoDisplay';
import CarouselControls from './CarouselControls';

class MediaDisplay extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fadeInClass: "fade-in-start",
            num: 0
        }
    }

    onChange = (num) => {
        this.setState({
            num: num,
        })
    }

    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    onLoad = async () => {
        this.setState({ fadeInClass: "fade-in-start" })
        await this.sleep(1000)
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
        let mediaRow;
        let darkMode = this.props.darkMode === true
        let descriptionClassNames = "image-description mx-auto"
        let centered = !(this.props.centered === false)

        if (darkMode) {
            descriptionClassNames += " dark-mode"
        }

        if (type === "image") {
            media = (<ImageDisplay url={url} callback={this.onLoad} alt={description} darkMode={darkMode} />)
        } else if (type === "video") {
            media = (<VideoDisplay url={url} callback={this.onLoad} />)
        }

        if (media !== undefined) {
            mediaRow = (<Row className="mx-auto pb-2">
                {media}
            </Row>)
        }

        let carouselControls = numContent > 1 ?
            (<CarouselControls numContent={numContent} onChange={this.onChange}
                darkMode={darkMode}
            />)
            : (null)

        let mediaDisplay = (
            <Col xs={9} md={5} lg={4} className="media-display my-4">
                {mediaRow}
                {carouselControls}
                <Row className={descriptionClassNames}>
                    <p>{description}</p>
                </Row>
            </Col>
        )

        if (centered) {
            return (
                <Fragment>
                    <Row className={"justify-content-center mx-auto " + this.state.fadeInClass}>
                        {mediaDisplay}
                    </Row>
                </Fragment>
            )
        } else {
            return (
                <div className="media-display uncentered">
                    {mediaDisplay}
                </div>
            )
        }
    }
}

export default MediaDisplay;