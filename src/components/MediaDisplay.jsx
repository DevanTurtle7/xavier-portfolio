import { useEffect, useState } from 'react';
import ImageDisplay from './ImageDisplay';
import VideoDisplay from './VideoDisplay';
import CarouselControls from './CarouselControls';

function MediaDisplay(props) {
    const [fadeInClass, setFadeInClass] = useState("fade-in-start");
    const [num, setNum] = useState(0)

    useEffect(() => {
        onLoad()
    }, [])

    const onChange = (num) => {
        setNum(num)
    }

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    const onLoad = async () => {
        setFadeInClass("fade-in-start")
        await sleep(1000)
        setFadeInClass("fade-in-end")
    }

    const getMediaDisplays = () => {
        let displays = []
        let data = props.data
        let content = data.content
        let tag = props.tag
        let viewable = props.viewable

        for (let i = 0; i < content.length; i++) {
            let current = content[i]
            let url = current.url
            let type = current.type

            if (type === "image") {
                displays.push(<ImageDisplay
                    url={url}
                    callback={onLoad}
                    alt={props.description}
                    active={num === i}
                    tag={tag}
                    viewable={viewable}
                    key={i}
                />)
            } else if (type === "video") {
                displays.push(<VideoDisplay url={url} callback={onLoad} key={i} />)
            }
        }

        return displays
    }

    const getRowClassNames = () => {
        let classNames = fadeInClass
        let centered = props.centered === true

        if (centered) {
            classNames += " centered-row"
        }

        return classNames
    }

    const getCarouselControls = () => {
        let data = props.data
        let content = data.content
        let numContent = content.length

        if (numContent > 1) {
            return (<CarouselControls numContent={numContent} onChange={onChange} />)
        } else {
            return null
        }
    }

    const getAsterisk = () => {
        let data = props.data
        let link = data.link

        if (link !== null && link !== undefined && link !== "") {
            return (<a className='asterisk noselect' href={link} target="_blank">*</a>)
        } else {
            return null
        }
    }

    const getMediaDisplayClassNames = () => {
        let classNames = "media-display"
        let centered = props.centered === true
        let tag = props.tag

        if (tag) {
            classNames += " " + tag
        }

        if (!centered) {
            classNames += " media-display-left"
        }

        return classNames
    }

    return (
        <div className={getRowClassNames()}>
            <div className={getMediaDisplayClassNames()}>
                <div className="media-container">
                    {getAsterisk()}
                    {getMediaDisplays()}
                </div>
                {getCarouselControls()}
                <div className="image-description">
                    <p>{props.description}</p>
                </div>
            </div>
        </div>
    )
}

export default MediaDisplay;