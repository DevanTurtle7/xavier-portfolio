import { Component } from 'react';

class VideoDisplay extends Component {
    onLoad = () => {
        this.props.callback()
    }

    render() {
        let url = this.props.url

        return (
            <video controls onLoadedData={this.onLoad} className="media-element">
                <source src={url} />
            </video>
        )
    }
}

export default VideoDisplay;