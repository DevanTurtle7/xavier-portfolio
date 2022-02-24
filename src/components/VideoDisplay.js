import { Component } from 'react';

class VideoDisplay extends Component {
    onLoad = () => {
        this.props.callback()
    }

    render() {
        let url = this.props.url

        return (
            <video controls controlsList="nodownload" onLoadedData={this.onLoad} className="media-element" preload="metadata">
                <source src={url + "#t=0.001"} />
            </video>
        )
    }
}

export default VideoDisplay;