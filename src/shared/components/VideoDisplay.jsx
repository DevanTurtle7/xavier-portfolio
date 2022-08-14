/**
 * A video display
 * 
 * Props:
 *  url: The url of the video
 *  callback: A callback to the parent class that is called when the video loads
 * 
 * @author Devan Kavalchek
 */

function VideoDisplay(props) {
    /**
     * Calls the callback once the video loads
     */
    const onLoad = () => {
        props.callback()
    }

    return (
        <video controls controlsList="nodownload" onLoadedData={onLoad} className="media-element" preload="metadata">
            {/* Start timestamp at 0.001 seconds to render thumbnail */}
            <source src={props.url + "#t=0.001"} />
        </video>
    )
}

export default VideoDisplay;