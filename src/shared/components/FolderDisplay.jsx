import { useState } from "react";
import Modal from "./Modal";
import TextDisplay from "./TextDisplay";
import VideoDisplay from "./VideoDisplay";

function FolderDisplay(props) {
  const [modalOpen, setModalOpen] = useState(false)

  const onClick = () => setModalOpen(!modalOpen)
  const onClose = () => setModalOpen(false)

  return (
    <>
      <div className="folder-link-container">
        <button onClick={onClick} className={"folder-link " + props.tag}>{props.data.description}</button>
      </div>

      <Modal open={modalOpen} onClose={onClose} scrollable>
        <div className="folder">
          <div className="folder-col">
            {
              props.data.content.reduce((displaysAccumulator, current, i) => {
                const type = current.type
                const key = current.docId + i.toString();

                if (type === "image") {
                  return [...displaysAccumulator, (<img src={current.url} className="folder-img" alt="ART" key={key} />)]
                } else if (type === "video") {
                  return [...displaysAccumulator, (
                    <div className="folder-video">
                      <VideoDisplay url={current.url} key={key} />
                    </div>
                  )]
                } else if (type === "text") {
                  return [...displaysAccumulator, (<TextDisplay data={current} tag={props.tag + "-folder"} key={key} />)]
                } else {
                  return [...displaysAccumulator]
                }
              }, [])
            }
          </div>
        </div>
      </Modal>
    </>
  )
}

export default FolderDisplay;