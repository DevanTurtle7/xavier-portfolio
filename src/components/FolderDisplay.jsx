import { useState } from "react";
import Modal from "./Modal";
import TextDisplay from "./TextDisplay";
import VideoDisplay from "./VideoDisplay";

function FolderDisplay(props) {
    const [modalOpen, setModalOpen] = useState(false)

    const onClick = () => {
        setModalOpen(!modalOpen)
    }

    const onClose = () => {
        setModalOpen(false)
    }

    const createImageDisplay = (data) => {
        return (<img src={data.url} />)
    }

    const createVideoDisplay = (data) => {
        return (<VideoDisplay url={data.url}/>)
    }

    const createTextDisplay = (data) => {
        return (<TextDisplay data={data} tag={props.tag + "-folder"}/>)
    }

    const getDisplays = () => {
        const displays = []
        const content = props.data.content;

        // Iterative over all the media
        for (let i = 0; i < content.length; i++) {
            const current = content[i]
            const type = current.type

            // Create a display
            if (type === "image") {
                displays.push(createImageDisplay(current))
            } else if (type === "video") {
                displays.push(createVideoDisplay(current))
            } else if (type === "text") {
                displays.push(createTextDisplay(current))
            }
        }

        // Return all displays
        return displays
    }

    console.log(props.data)

    return (
        <>
            <a onClick={onClick} className="folder-link">{props.data.description}</a>

            <Modal open={modalOpen} onClose={onClose} scrollable>
                <div className="folder">
                    <div className="folder-col">
                        {getDisplays()}
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default FolderDisplay;