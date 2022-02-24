import { Component } from 'react';
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
        let numContent = content.length
        let media = [];
        let descriptionClassNames = "image-description"
        let centered = !(this.props.centered === false)
        let tag = this.props.tag
        let viewable = this.props.viewable
        let link = data.link

        for (let i = 0; i < numContent; i++) {
            let current = content[i]
            let url = current.url
            let type = current.type

            if (type === "image") {
                media.push(<ImageDisplay
                    url={url}
                    callback={this.onLoad}
                    alt={description}
                    active={num === i}
                    tag={tag}
                    viewable={viewable}
                    key={i}
                />)
            } else if (type === "video") {
                media.push(<VideoDisplay url={url} callback={this.onLoad} key={i} />)
            }
        }

        let carouselControls = numContent > 1 ?
            (<CarouselControls numContent={numContent} onChange={this.onChange}
            />)
            : (null)

        let rowClassNames = this.state.fadeInClass
        let mediaDisplayClassNames = "media-display"

        if (tag) {
            mediaDisplayClassNames += " " + tag
        }

        if (centered) {
            rowClassNames += " centered-row"
        } else {
            mediaDisplayClassNames += " media-display-left"
        }

        let asterisk = (link !== null && link !== undefined && link !== "") ?
            (<a className='asterisk noselect' href={link} target="_blank">*</a>)
            : (null)


        return (
            <div className={rowClassNames}>
                <div className={mediaDisplayClassNames}>
                    <div className="media-container">
                        {asterisk}
                        {media}
                    </div>
                    {carouselControls}
                    <div className={descriptionClassNames}>
                        <p>{description}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default MediaDisplay;